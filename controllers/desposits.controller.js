const DepositModel = require('../models/deposits.model');

class DepositsController{
    constructor(){}   
    
    async createDeposit(req,res){
        try{           
            const deposit = new DepositModel(req.body);
            await deposit.save();
            res.send({
                answer: "OK",
                message: "Depósito registrado",
                id: deposit._id
            });      
        }catch(error){
            console.log(error);
            res.status(500).send({
                answer: "ERROR",
                message: "Error al crear el depósito"
            });
        }        
    }

    async getDeposits(req,res){
        try{
            const result = await DepositModel.find();            
            res.send(result);    
            if(result.length === 0){                
                console.log("No hay depósitos registrados");            
            }        
        }catch(error){
            console.log(error);
            res.status(500).send({
                message: "Error al hacer la consulta"
            });
        }        
    }

    async getDepositById(req,res){     
        try{
            const result = await DepositModel.findById(req.params.id);
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

    async getDepositByDepoId(req,res){     
        try{
            const result = await DepositModel.findOne({id_deposit: req.params.depoId});
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
        }       
    }

    async getDepositByUserId(req,res){
        try{            
            const result = await DepositModel.find({id_user:req.params.userId});
            if(result.length>0){
                res.send(result);
            }else{
                res.status(404).send({message: "No se encontraron coincidencias"});               
            }
        }catch(error){
            console.log(error);
            res.status(500).send({
                message: "Error al hacer la consulta"
            });
        }   
    }

    async updateDeposit(req,res){
        try{
            const result = await DepositModel.findById(req.params.id);
            if(result){
               let depositData = req.body;
               //delete depositData['id_deposit'];
               await DepositModel.findByIdAndUpdate({_id:req.params.id}, depositData, {new:true});
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

    async deleteDeposit(req,res){
        try{
            const result = await DepositModel.findById(req.params.id);
            if(result){
                await DepositModel.findByIdAndRemove(req.params.id);
                res.send({
                    answer: "OK",
                    message: "Depósito eliminado"
                });
            }else{
                res.status(404).send({
                    answer: "ERROR",
                    message: "No hay coincidencias para eliminar"
                });
            }
        }catch(error){
            console.log(error);
            res.status(500).send({
                message: "Error al eliminar el depósito"
            });
        }
    }   
    
}

module.exports = DepositsController;