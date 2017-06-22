var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Anagrafica_Schema = Schema({
    // Udo: { type: Schema.ObjectId, ref: 'Udo', required: false },
    Udo: { type: String, required: false },
    Denominazione: { type: String, required: true },
    Cudes: { type: String, required: true },
    // Ats: { type: Schema.ObjectId, ref: 'Ats', required: false},
    Ats: { type: Number, required: false },
    // Titolarita: { type: Schema.ObjectId, ref: 'Titolarita' },
    Titolarita: { type: String, required: false },
    Proprietario: { type: String, required: true },
    Finanziamenti: { type: String, required: true },
    Concessione_Comune: { type: String, required: true },
    Ore_Formazione: { type: Number, required: true },
    PL1: { type: Number, required: false },
    PL2: { type: Number, required: false },
    PL3: { type: Number, required: false},
    PL4: { type: Number, required: false },
    Oltre4PL: { type: Number, required: false },
    PLB1: { type: Number, required: false },
    PLB2: { type: Number, required: false },
    PLB3: { type: Number, required: false },
    PLB4: { type: Number, required: false },
    Oltre4PLB: { type: Number, required: false },
    Condizionamento: { type: String, required: true },
    Ossigeno: { type: String, required: true },
    Infermiera_H24: { type: String, required: true },
    Medico_H24: { type: String, required: true },
    Infermieri_notte: { type: Number, min: 0, max: 100, required: true },
    Medici_Notte: { type: Number, min: 0, max: 100, required: true },
    Data_compilazione: { type: Date, default: Date.now, required: true }
});

// Virtual for this "Anagrafica" instance URL
Anagrafica_Schema
    .virtual('url')
    .get(function () {
        return '/schedastruttura/anagrafica/' + this._id
    });

Anagrafica_Schema
    .virtual('Data_compilazione_dd_mm_yyyy')
    .get(function () {
        return moment(this.Data_compilazione).format('dd/mm/yyyy');
    });

//Export model
module.exports = mongoose.model('Anagrafica', Anagrafica_Schema);