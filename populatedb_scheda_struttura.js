#! /usr/bin/env node

console.log('This script populates a some test "anagrafica" of "Scheda_Struttura" to your database. Specified database as argument - e.g.: "populatedb scheda struttura.js" mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Anagrafica= require('./models/anagrafica')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var anagrafiche = []

function anagraficaCreate(Udo, Denominazione, Cudes, Ats, Titolarita, Proprietario,
    Finanziamenti, Concessione_Comune, Ore_Formazione, PL1, PL2, PL3, PL4, Oltre4PL,
    PLB1, PLB2, PLB3, PLB4, Oltre4PLB, Condizionamento, Ossigeno, Infermiera_H24, Medico_H24,
    Infermieri_notte, Medici_Notte, Data_compilazione, cb) {

    anagraficadetail = {
        Udo: Udo,
        Denominazione: Denominazione,
        Cudes: Cudes,
        Ats: Ats,
        Titolarita: Titolarita,
        Proprietario: Proprietario,
        Finanziamenti: Finanziamenti,
        Concessione_Comune: Concessione_Comune,
        Ore_Formazione: Ore_Formazione,
        PL1: PL1,
        PL2: PL2,
        PL3: PL3,
        PL4: PL4,
        Oltre4PL: Oltre4PL,
        PLB1: PLB1,
        PLB2: PLB2,
        PLB3: PLB3,
        PLB4: PLB4,
        Oltre4PLB: Oltre4PLB,
        Condizionamento: Condizionamento,
        Ossigeno: Ossigeno,
        Infermiera_H24: Infermiera_H24,
        Medico_H24: Medico_H24,
        Infermieri_notte: Infermieri_notte,
        Medici_Notte: Medici_Notte,
        Data_compilazione: Date()
    }

    // Esempio di valorizzazione di riferimento a schema object che può non esistere (rel 1-0:n)
    // if (aaaa != false) anagraficadetail.aaaa = aaaa

    var anagrafica = new Anagrafica(anagraficadetail);

    anagrafica.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Anagrafica: ' + anagrafica);
        anagrafiche.push(anagrafica)
        cb(null, anagrafica)
    });
}


function createAnagrafica(cb) {
    async.parallel([
        function (callback) {
            // Prima riga
            anagraficaCreate(
                'RSA',
                'Denominazione 1',
                '123456789',
                '321',
                'Proprietario',
                'Pinco Pallino',
                'NO',
                'SI',
                6,
                12,
                18,
                4,
                15,
                8,
                112,
                118,
                14,
                115,
                18,
                'NO',
                'SI',
                'SI', 
                'NO',
                5,
                4,
                Date(),
                callback);
        },
        // Seconda riga
        function (callback) {
            anagraficaCreate(
                'RSD',
                'Denominazione 2',
                '123456789',
                '999',
                'Proprietario 2',
                'Prova 2',
                'NO',
                'NO',
                61,
                112,
                118,
                44,
                145,
                8,
                212,
                218,
                24,
                215,
                28,
                'SI',
                'SI',
                'SI', 
                'NO',
                52,
                42,
                Date(),
                callback);
        }
        ],
        // optional callback
        cb);
}

async.series([
    createAnagrafica
],
    // optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Anagrafica: ' + anagrafiche);
        }
        //All done, disconnect from database
        mongoose.connection.close();
    });




