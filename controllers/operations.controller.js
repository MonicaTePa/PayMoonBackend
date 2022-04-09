const TransactionModel = require('../models/transactions.model');
const PocketModel = require('../models/Pocket.model');
const DepositModel = require('../models/deposits.model');

class OperationsController{

    constructor(){}

    async moneyTransference(req,res){
        try{
            const transaction = new TransactionModel(req.body);   
            const payer_pocket = await PocketModel.findOne({id_user: transaction.id_payer}).exec();
            const receiver_pocket = await PocketModel.findOne({id_user: transaction.id_receiver}).exec();
            if(payer_pocket.balance < transaction.amount){
                res.send({
                    answer:"OK",
                    code: 1,
                    message: "Saldo insuficiente para la transacción"
                });
            }else{
                /* res.send({
                    massage:"se puede hacer la transacción",
                    saldo_pagador:payer_pocket.balance,
                    monto: transaction.amount
                }); */
                receiver_pocket.former_balance = receiver_pocket.balance;
                receiver_pocket.balance = receiver_pocket.balance + transaction.amount;
                receiver_pocket.receptions = receiver_pocket.receptions + transaction.amount;
                if(transaction.type === "BOLSILLO"){
                    payer_pocket.former_balance = payer_pocket.balance;
                    payer_pocket.balance = payer_pocket.balance - transaction.amount;
                    payer_pocket.payments = payer_pocket.payments + transaction.amount;
                }

                await PocketModel.findByIdAndUpdate({_id:payer_pocket._id}, payer_pocket, {new: true});
                await PocketModel.findByIdAndUpdate({_id:receiver_pocket._id}, receiver_pocket, {new: true});

                await transaction.save();            
                

                res.send({
                    answer: "OK",
                    code: 0,
                    message: "Transacción exitosa"
                })
                
            }                 

        }catch(error){
            console.log(error);
            res.status(500).send({
                answer: "ERROR",
                message: "Error al hacer la transacción"
            });
        }
    }

    async moneyDeposit(req,res){
        try{
            const deposit = new DepositModel(req.body);
            const user_pocket = await PocketModel.findOne({id_user: deposit.id_user});
            if(user_pocket){
                // res.send(user_pocket);
                user_pocket.former_balance = user_pocket.balance;
                user_pocket.balance = user_pocket.balance + deposit.amount;
                user_pocket.deposits = user_pocket.deposits + deposit.amount;
                user_pocket.last_deposit = deposit.amount;

                const result = await PocketModel.findByIdAndUpdate({_id:user_pocket._id}, user_pocket, { new:true});
                if(result){
                    await deposit.save();
                    res.send({
                        answer: "OK",
                        code: 0,
                        message: "Depósito existoso"                                         
                    }); 
                } else {
                    res.status(500).send({
                        answer: "ERROR",
                        message: "Error al hacer el depósito"
                    });
                }              
            }else{
                res.status(404).send({
                    answer: "ERROR",
                    message: "No se encotró el bolsillo del usuario especificado"
                });
            }
            
        }catch(error){
            res.status(500).send({
                answer: "ERROR",
                message: "Error al hacer el depósito"
            });
        }
    }

}

module.exports = OperationsController;