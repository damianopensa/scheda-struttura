var Anagrafica = require('../models/anagrafica')

//var Author = require('../models/author')
//var Genre = require('../models/genre')
//var AnagraficaInstance = require('../models/anagraficainstance')

var async = require('async')

exports.index = function (req, res) {

    async.parallel({
        anagrafica_count: function (callback) {
            Anagrafica.count(callback)
        },
        //book_instance_count: function (callback) {
        //    BookInstance.count(callback)
        //},
        //book_instance_available_count: function (callback) {
        //    BookInstance.count({ status: 'Available' }, callback)
        //},
        //author_count: function (callback) {
        //    Author.count(callback)
        //},
        //genre_count: function (callback) {
        //    Genre.count(callback)
        //},
    }, function (err, results) {
        res.render('index', { title: 'Anagrafica Scheda Struttura Home', error: err, data: results });
    });
};

// Display list of all anagrafiche
exports.anagrafica_list = function (req, res, next) {

    Anagrafica.find({}, 'Udo Denominazione Cudes Ats ')
        // .populate('author')
        .exec(function (err, list_anagrafiche) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('anagrafica_list', { title: 'Anagrafica List', anagrafica_list: list_anagrafiche });
        })

};

// Display detail page for a specific anagrafica
exports.anagrafica_detail = function (req, res, next) {

    async.parallel({
        anagrafica: function (callback) {

            Anagrafica.findById(req.params.id)
                // .populate('author')   DP
                // .populate('genre')    DP
                .exec(callback)
        },
        //anagrafica_instance: function (callback) {

        //    AnagraficaInstance.find({ 'anagrafica': req.params.id })
        //        //.populate('anagrafica')
        //        .exec(callback)
        //},
    }, function (err, results) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('anagrafica_detail', { title: 'Title', anagrafica: results.anagrafica });
    });

};

// Display anagrafica create form on GET
exports.anagrafica_create_get = function (req, res, next) {

    //Get all authors and genres, which we can use for adding to our anagrafica.
    //async.parallel({
    //    authors: function (callback) {
    //        Author.find(callback)
    //    },
    //    genres: function (callback) {
    //        Genre.find(callback)
    //    },
    //}, function (err, results) {
    //    if (err) { return next(err); }
    //    res.render('anagrafica_form', { title: 'Create Anagrafica', authors: results.authors, genres: results.genres });
    //});
    // res.render('anagrafica_form', { title: 'Create Anagrafica', authors: results.authors, genres: results.genres });
    res.render('anagrafica_form', { title: 'Create Anagrafica' });
};

// Handle anagrafica create on POST
exports.anagrafica_create_post = function (req, res, next) {

    req.checkBody('Udo', 'Udo Dato obbligatorio.').notEmpty();
    req.checkBody('Denominazione', 'Denominazione Dato obbligatorio.').notEmpty();
    req.checkBody('Cudes', 'Cudes Dato obbligatorio.').notEmpty();
    req.checkBody('Ats', 'Ats Dato obbligatorio.').notEmpty();
    req.checkBody('Titolarita', 'Titolarita Dato obbligatorio.').notEmpty();
    req.checkBody('Proprietario', 'Proprietario Dato obbligatorio.').notEmpty();
    req.checkBody('Finanziamenti', 'Finanziamenti Dato obbligatorio.').notEmpty();
    req.checkBody('Concessione_Comune', 'Concessione_Comune Dato obbligatorio.').notEmpty();
    req.checkBody('Ore_Formazione', 'Ore_Formazione Dato obbligatorio.').notEmpty();
    req.checkBody('PL1', 'PL1 Dato obbligatorio.').notEmpty();
    req.checkBody('PL2', 'PL2 Dato obbligatorio.').notEmpty();
    req.checkBody('PL3', 'PL3 Dato obbligatorio.').notEmpty();
    req.checkBody('PL4', 'PL4 Dato obbligatorio.').notEmpty();
    req.checkBody('Oltre4PL', 'Oltre4PL Dato obbligatorio.').notEmpty();
    req.checkBody('PLB1', 'PLB1 Dato obbligatorio.').notEmpty();
    req.checkBody('PLB2', 'PLB2 Dato obbligatorio.').notEmpty();
    req.checkBody('PLB3', 'PLB3 Dato obbligatorio.').notEmpty();
    req.checkBody('PLB4', 'PLB4 Dato obbligatorio.').notEmpty();
    req.checkBody('Oltre4PLB', 'Oltre4PLB Dato obbligatorio.').notEmpty();
    req.checkBody('Condizionamento', 'Condizionamento Dato obbligatorio.').notEmpty();
    req.checkBody('Ossigeno', 'Ossigeno Dato obbligatorio.').notEmpty();
    req.checkBody('Infermiera_H24', 'Infermiera_H24 Dato obbligatorio.').notEmpty();
    req.checkBody('Medico_H24', 'Medico_H24 Dato obbligatorio.').notEmpty();
    req.checkBody('Infermieri_notte', 'Infermieri_notte Dato obbligatorio.').notEmpty();
    req.checkBody('Medici_Notte', 'Medici_Notte Dato obbligatorio.').notEmpty();
    req.checkBody('Data_compilazione', 'Data Invalida').optional({ checkFalsy: true }).isDate();

    // Escape
    req.sanitize('Udo').escape();
    req.sanitize('Denominazione').escape();
    req.sanitize('Cudes').escape();
    req.sanitize('Ats').escape();
    req.sanitize('Titolarita').escape();
    req.sanitize('Proprietario').escape();
    req.sanitize('Finanziamenti').escape();
    req.sanitize('Concessione_Comune').escape();
    req.sanitize('Ore_Formazione').escape();
    req.sanitize('PL1').escape();
    req.sanitize('PL2').escape();
    req.sanitize('PL3').escape();
    req.sanitize('PL4').escape();
    req.sanitize('Oltre4PL').escape();
    req.sanitize('PLB1').escape();
    req.sanitize('PLB2').escape();
    req.sanitize('PLB3').escape();
    req.sanitize('PLB4').escape();
    req.sanitize('Oltre4PLB').escape();
    req.sanitize('Condizionamento').escape();
    req.sanitize('Ossigeno').escape();
    req.sanitize('Infermiera_H24').escape();
    req.sanitize('Medico_H24').escape();
    req.sanitize('Infermieri_notte').escape();
    req.sanitize('Medici_Notte').escape();
    req.sanitize('Data_compilazione').escape();

    // Trim
    req.sanitize('Udo').trim();
    req.sanitize('Denominazione').trim();
    req.sanitize('Cudes').trim();
    req.sanitize('Ats').trim();
    req.sanitize('Titolarita').trim();
    req.sanitize('Proprietario').trim();
    req.sanitize('Finanziamenti').trim();
    req.sanitize('Concessione_Comune').trim();
    req.sanitize('Ore_Formazione').trim();
    req.sanitize('PL1').trim();
    req.sanitize('PL2').trim();
    req.sanitize('PL3').trim();
    req.sanitize('PL4').trim();
    req.sanitize('Oltre4PL').trim();
    req.sanitize('PLB1').trim();
    req.sanitize('PLB2').trim();
    req.sanitize('PLB3').trim();
    req.sanitize('PLB4').trim();
    req.sanitize('Oltre4PLB').trim();
    req.sanitize('Condizionamento').trim();
    req.sanitize('Ossigeno').trim();
    req.sanitize('Infermiera_H24').trim();
    req.sanitize('Medico_H24').trim();
    req.sanitize('Infermieri_notte').trim();
    req.sanitize('Medici_Notte').trim();

    req.sanitize('Data_compilazione').toDate();

     var anagrafica = new Anagrafica(
        {
            Udo: req.body.Udo,
            Denominazione: req.body.Denominazione,
            Cudes: req.body.Cudes,
            Ats: req.body.Ats,
            Titolarita: req.body.Titolarita,
            Proprietario: req.body.Proprietario,
            Finanziamenti: req.body.Finanziamenti,
            Concessione_Comune: req.body.Concessione_Comune,
            Ore_Formazione: req.body.Ore_Formazione,
            PL1: req.body.PL1,
            PL2: req.body.PL2,
            PL3: req.body.PL3,
            PL4: req.body.PL4,
            Oltre4PL: req.body.Oltre4PL,
            PLB1: req.body.PLB1,
            PLB2: req.body.PLB2,
            PLB3: req.body.PLB3,
            PLB4: req.body.PLB4,
            Oltre4PLB: req.body.Oltre4PLB,
            Condizionamento: req.body.Condizionamento,
            Ossigeno: req.body.Ossigeno,
            Infermiera_H24: req.body.Infermiera_H24,
            Medico_H24: req.body.Medico_H24,
            Infermieri_notte: req.body.Infermieri_notte,
            Medici_Notte: req.body.Medici_Notte,
            Data_compilazione: req.body.Data_compilazione,
            // -- Segue esempio di split di Array
            // genre: (typeof req.body.genre === 'undefined') ? [] : req.body.genre.split(",")
        });

    console.log('ANAGRAFICA: ' + anagrafica);

    // Esegue validazione
    var errors = req.validationErrors();

    if (errors) {
        // Some problems so we need to re-render our anagrafica
        console.log('Udo: ' + req.body.Udo);
        console.log('Denominazione: ' + req.body.Denominazione);
        console.log('Ats: ' + req.body.Ats);
        console.log('Cudes: ' + req.body.Cudes);

        console.log('ERRORS: ' + errors);
        //Get all authors and genres for form
        
        //async.parallel({
        //    authors: function (callback) {
        //        Author.find(callback)
        //    },
        //    genres: function (callback) {
        //        Genre.find(callback)
        //    },
        //}, function (err, results) {
        //    if (err) { return next(err); }
        //    // Mark our selected genres as checked
        //    for (i = 0; i < results.genres.length; i++) {
        //        if (anagrafica.genre.indexOf(results.genres[i]._id) > -1) {
        //            //console.log('IS_IN_GENRES: '+results.genres[i].name);
        //            results.genres[i].checked = 'true';
        //            //console.log('ADDED: '+results.genres[i]);
        //        }
        //    }
        //    res.render('anagrafica_form', { title: 'Create Anagrafica', authors: results.authors, genres: results.genres, anagrafica: anagrafica, errors: errors });
        //});

        res.render('anagrafica_form', { title: 'Create Anagrafica', anagrafica: anagrafica, errors: errors });

    }
    else {
        // Data from form is valid.
        // We could check if anagrafica exists already, but lets just save.

        anagrafica.save(function (err) {
            if (err) { return next(err); }
            //successful - redirect to new anagrafica record.
            res.redirect(anagrafica.url);
        });
    }

};

// Display anagrafica delete form on GET
exports.anagrafica_delete_get = function (req, res, next) {

    async.parallel({
        anagrafica: function (callback) {
            // Anagrafica.findById(req.params.id).populate('author').populate('genre').exec(callback)
            Anagrafica.findById(req.params.id).exec(callback)
        },
        //anagrafica_anagraficainstances: function (callback) {
        //    AnagraficaInstance.find({ 'anagrafica': req.params.id }).exec(callback)
        //},
    }, function (err, results) {
        if (err) { return next(err); }
        //Successful, so render
        //res.render('anagrafica_delete', { title: 'Delete Anagrafica', anagrafica: results.anagrafica, anagrafica_instances: results.anagrafica_anagraficainstances });
        res.render('anagrafica_delete', { title: 'Delete Anagrafica', anagrafica: results.anagrafica });
    });

};

// Handle anagrafica delete on POST
exports.anagrafica_delete_post = function (req, res, next) {

    //Assume the post will have id (ie no checking or sanitisation).

    async.parallel({
        anagrafica: function (callback) {
            // Anagrafica.findById(req.params.id).populate('author').populate('genre').exec(callback)
            Anagrafica.findById(req.params.id).exec(callback)
        },
        //anagrafica_anagraficainstances: function (callback) {
        //    AnagraficaInstance.find({ 'anagrafica': req.params.id }).exec(callback)
        //},
    }, function (err, results) {
        if (err) { return next(err); }
        //Success
        //if (results.anagrafica_anagraficainstances > 0) {
        //    //Anagrafica has anagrafica_instances. Render in same way as for GET route.
        //    res.render('anagrafica_delete', { title: 'Delete Anagrafica', anagrafica: results.anagrafica, anagrafica_instances: results.anagrafica_anagraficainstances });
        //    return;
        //}
        //else {
        //    //Anagrafica has no anagraficainstances. Delete object and redirect to the list of anagrafiche.
        //    Anagrafica.findByIdAndRemove(req.body.id, function deleteAnagrafica(err) {
        //        if (err) { return next(err); }
        //        //Success - got to anagrafiche list
        //        res.redirect('/catalog/anagrafiche')
        //    })

        //}
        //Anagrafica has no anagraficainstances. Delete object and redirect to the list of anagrafiche.
        Anagrafica.findByIdAndRemove(req.body.id, function deleteAnagrafica(err) {
            if (err) { return next(err); }
            //Success - got to anagrafiche list
            res.redirect('/schedastruttura/anagraficas')
        })
    });

};

// Display anagrafica update form on GET
exports.anagrafica_update_get = function (req, res, next) {

    req.sanitize('id').escape();
    req.sanitize('id').trim();

    //Get anagrafica, authors and genres for form
    async.parallel({
        anagrafica: function (callback) {
            // Anagrafica.findById(req.params.id).populate('author').populate('genre').exec(callback)
            Anagrafica.findById(req.params.id).exec(callback)
        },
        //authors: function (callback) {
        //    Author.find(callback)
        //},
        //genres: function (callback) {
        //    Genre.find(callback)
        //},
    }, function (err, results) {
        if (err) { return next(err); }

        // Mark our selected genres as checked
        //for (var all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++) {
        //    for (var anagrafica_g_iter = 0; anagrafica_g_iter < results.anagrafica.genre.length; anagrafica_g_iter++) {
        //        if (results.genres[all_g_iter]._id.toString() == results.anagrafica.genre[anagrafica_g_iter]._id.toString()) {
        //            results.genres[all_g_iter].checked = 'true';
        //        }
        //    }
        //}
        // res.render('anagrafica_form', { title: 'Update Anagrafica', authors: results.authors, genres: results.genres, anagrafica: results.anagrafica });
        res.render('anagrafica_form', { title: 'Update Anagrafica', anagrafica: results.anagrafica });
    });

};

// Handle anagrafica update on POST
exports.anagrafica_update_post = function (req, res, next) {

    //Sanitize id passed in.
    req.sanitize('id').escape();
    req.sanitize('id').trim();

    //Check other data
    req.checkBody('Udo', 'Udo - Dato obbligatorio.').notEmpty();
    req.checkBody('Denominazione', 'Denominazione - Dato obbligatorio.').notEmpty();
    req.checkBody('Cudes', 'Cudes - Dato obbligatorio.').notEmpty();
    req.checkBody('Ats', 'Ats - Dato obbligatorio.').notEmpty();
    req.checkBody('Titolarita', 'Titolarita - Dato obbligatorio.').notEmpty();
    req.checkBody('Proprietario', 'Proprietario - Dato obbligatorio.').notEmpty();
    req.checkBody('Finanziamenti', 'Finanziamenti - Dato obbligatorio.').notEmpty();
    req.checkBody('Concessione_Comune', 'Concessione_Comune - Dato obbligatorio.').notEmpty();
    req.checkBody('Ore_Formazione', 'Ore_Formazione - Dato obbligatorio.').notEmpty();
    req.checkBody('PL1', 'PL1 - Dato obbligatorio.').notEmpty();
    req.checkBody('PL2', 'PL2 - Dato obbligatorio.').notEmpty();
    req.checkBody('PL3', 'PL3 - Dato obbligatorio.').notEmpty();
    req.checkBody('PL4', 'PL4 - Dato obbligatorio.').notEmpty();
    req.checkBody('Oltre4PL', 'Oltre4PL - Dato obbligatorio.').notEmpty();
    req.checkBody('PLB1', 'PLB1 - Dato obbligatorio.').notEmpty();
    req.checkBody('PLB2', 'PLB2 - Dato obbligatorio.').notEmpty();
    req.checkBody('PLB3', 'PLB3 - Dato obbligatorio.').notEmpty();
    req.checkBody('PLB4', 'PLB4 - Dato obbligatorio.').notEmpty();
    req.checkBody('Oltre4PLB', 'Oltre4PLB - Dato obbligatorio.').notEmpty();
    req.checkBody('Condizionamento', 'Condizionamento - Dato obbligatorio.').notEmpty();
    req.checkBody('Ossigeno', 'Ossigeno - Dato obbligatorio.').notEmpty();
    req.checkBody('Infermiera_H24', 'Infermiera_H24 - Dato obbligatorio.').notEmpty();
    req.checkBody('Medico_H24', 'Medico_H24 - Dato obbligatorio.').notEmpty();
    req.checkBody('Infermieri_notte', 'Infermieri_notte - Dato obbligatorio.').notEmpty();
    req.checkBody('Medici_Notte', 'Medici_Notte - Dato obbligatorio.').notEmpty();
    req.checkBody('Data_compilazione', 'Data Invalida').optional({ checkFalsy: true }).isDate();

    // Escape
    req.sanitize('Udo').escape();
    req.sanitize('Denominazione').escape();
    req.sanitize('Cudes').escape();
    req.sanitize('Ats').escape();
    req.sanitize('Titolarita').escape();
    req.sanitize('Proprietario').escape();
    req.sanitize('Finanziamenti').escape();
    req.sanitize('Concessione_Comune').escape();
    req.sanitize('Ore_Formazione').escape();
    req.sanitize('PL1').escape();
    req.sanitize('PL2').escape();
    req.sanitize('PL3').escape();
    req.sanitize('PL4').escape();
    req.sanitize('Oltre4PL').escape();
    req.sanitize('PLB1').escape();
    req.sanitize('PLB2').escape();
    req.sanitize('PLB3').escape();
    req.sanitize('PLB4').escape();
    req.sanitize('Oltre4PLB').escape();
    req.sanitize('Condizionamento').escape();
    req.sanitize('Ossigeno').escape();
    req.sanitize('Infermiera_H24').escape();
    req.sanitize('Medico_H24').escape();
    req.sanitize('Infermieri_notte').escape();
    req.sanitize('Medici_Notte').escape();
    req.sanitize('Data_compilazione').escape();

    // Trim
    req.sanitize('Udo').trim();
    req.sanitize('Denominazione').trim();
    req.sanitize('Cudes').trim();
    req.sanitize('Ats').trim();
    req.sanitize('Titolarita').trim();
    req.sanitize('Proprietario').trim();
    req.sanitize('Finanziamenti').trim();
    req.sanitize('Concessione_Comune').trim();
    req.sanitize('Ore_Formazione').trim();
    req.sanitize('PL1').trim();
    req.sanitize('PL2').trim();
    req.sanitize('PL3').trim();
    req.sanitize('PL4').trim();
    req.sanitize('Oltre4PL').trim();
    req.sanitize('PLB1').trim();
    req.sanitize('PLB2').trim();
    req.sanitize('PLB3').trim();
    req.sanitize('PLB4').trim();
    req.sanitize('Oltre4PLB').trim();
    req.sanitize('Condizionamento').trim();
    req.sanitize('Ossigeno').trim();
    req.sanitize('Infermiera_H24').trim();
    req.sanitize('Medico_H24').trim();
    req.sanitize('Infermieri_notte').trim();
    req.sanitize('Medici_Notte').trim();

    req.sanitize('Data_compilazione').toDate();

    // Esempio 
    // req.sanitize('genre').escape();

    var anagrafica = new Anagrafica(
        {
            Udo: req.body.Udo,
            Denominazione: req.body.Denominazione,
            Cudes: req.body.Cudes,
            Ats: req.body.Ats,
            Titolarita: req.body.Titolarita,
            Proprietario: req.body.Proprietario,
            Finanziamenti: req.body.Finanziamenti,
            Concessione_Comune: req.body.Concessione_Comune,
            Ore_Formazione: req.body.Ore_Formazione,
            PL1: req.body.PL1,
            PL2: req.body.PL2,
            PL3: req.body.PL3,
            PL4: req.body.PL4,
            Oltre4PL: req.body.Oltre4PL,
            PLB1: req.body.PLB1,
            PLB2: req.body.PLB2,
            PLB3: req.body.PLB3,
            PLB4: req.body.PLB4,
            Oltre4PLB: req.body.Oltre4PLB,
            Condizionamento: req.body.Condizionamento,
            Ossigeno: req.body.Ossigeno,
            Infermiera_H24: req.body.Infermiera_H24,
            Medico_H24: req.body.Medico_H24,
            Infermieri_notte: req.body.Infermieri_notte,
            Medici_Notte: req.body.Medici_Notte,
            Data_compilazione: req.body.Data_compilazione,
            // -- Segue esempio di split di Array
            //genre: (typeof req.body.genre === 'undefined') ? [] : req.body.genre.split(","),
            _id: req.params.id     //This is required, or a new ID will be assigned!
        });

    var errors = req.validationErrors();

    if (errors) {
        //// Re-render anagrafica with error information
        //// Get all authors and genres for form
        //async.parallel({
        //    authors: function (callback) {
        //        Author.find(callback)
        //    },
        //    genres: function (callback) {
        //        Genre.find(callback)
        //    },
        //}, function (err, results) {
        //    if (err) { return next(err); }

        //    // Mark our selected genres as checked
        //    for (i = 0; i < results.genres.length; i++) {
        //        if (anagrafica.genre.indexOf(results.genres[i]._id) > -1) {
        //            results.genres[i].checked = 'true';
        //        }
        //    }
        //    res.render('anagrafica_form', { title: 'Update Anagrafica', authors: results.authors, genres: results.genres, anagrafica: anagrafica, errors: errors });
        //});

        //res.render('anagrafica_form', { title: 'Update Anagrafica', authors: results.authors, genres: results.genres, anagrafica: anagrafica, errors: errors });
        res.render('anagrafica_form', { title: 'Update Anagrafica', anagrafica: anagrafica, errors: errors });
    }
    else {
        // Data from form is valid. Update the record.
        Anagrafica.findByIdAndUpdate(req.params.id, anagrafica, {}, function (err, theanagrafica) {
            if (err) { return next(err); }
            //successful - redirect to anagrafica detail page.
            res.redirect(theanagrafica.url);
        });
    }

};
