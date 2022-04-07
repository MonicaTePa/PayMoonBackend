const TransactionModel = require('../models/transactions.model');

class TransactionsController{
    constructor(){}    

    async createTransaction(req,res){
        try{                  
                                 
            const transaction = new TransactionModel(req.body);
            await transaction.save();
            res.send({ 
                answer: "OK",
                message: "Transacción registrada con éxito",
                id: transaction._id
            });            
            
        }catch(error){
            console.log(error);
            res.status(500).send({
                answer: "ERROR",
                message: "Error al crear la transacción"
            });
        }        
    }

    async getTransactions(req,res){
        try{
            const result = await TransactionModel.find();            
            res.send(result);    
            if(result.length === 0){              
                console.log("No hay transacciones registradas");     
            }        
        }catch(error){
            console.log(error);
            res.status(500).send({
                message: "Error al hacer la consulta"
            });
        }        
    }

    async getTransactionById(req,res){     
        try{
            const result = await TransactionModel.findById(req.params.id);
            if(result){
                res.send(result);
            }else{
                res.status(404).send({message: "No se encontraron coincidencias"});
            }
        }catch(error){
            console.log(error);
            res.status(500).send({
                message: "Error al hacer la consulta"        
            });
            console.log(error);
        }       
    }

    async getTransactionByTransId(req,res){     
        try{
            const result = await TransactionModel.findOne({id_transaction: req.params.transId});
            if(result){
                res.send(result);
            }else{
                res.status(404).send({message: "No se encontraron coincidencias"});
            }
        }catch(error){
            console.log(error);
            res.status(500).send({
                message: "Error al hacer la consult"
            });
        }       
    }

    async getTransactionByUserId(req,res){
        try{
            const result = await TransactionModel.find({$or:[{id_payer:req.params.userId},{id_receiver: req.params.userId}]});
            if(result.length>0){
                res.send(result);
            }else{
                res.send({message: "No se encontraron coincidencias"});
            }
        }catch(error){
            console.log(error);
            res.status(500).send({
                message: "Error al hacer la consulta"
            });
        }   
    }

    async updateTransaction(req,res){
        try{
            const result = await TransactionModel.findById(req.params.id);
            if(result){
               let transactionData = req.body;
               delete transactionData['id_transaction'];
               await TransactionModel.findByIdAndUpdate({_id:req.params.id}, transactionData, {new:true});
               res.send({
                   message: "Actualización exitosa"
               });
            }else{
                res.status(404).send({
                    message: "No hay coincidencias para actualizar"
                });
            }           
        }catch(error){
            console.log(error);
            res.status(500).send({
                message: "Error al hacer la actualización"
            });
        }
    }

    async deleteTransaction(req,res){
        try{
            const result = await TransactionModel.findById(req.params.id);
            if(result){
                await TransactionModel.findByIdAndRemove(req.params.id);
                res.send({
                    message: "Transacción eliminada"
                });
            }else{
                res.status(404).send({
                    message: "No hay coincidencias para eliminar"
                });
            }
        }catch(error){
            console.log(error);
            res.status(500).send({
                message: "Error al hacer la eliminación"
            });
        }
    }   
}

module.exports = TransactionsController;