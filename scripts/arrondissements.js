const rawArrondissements = require('../assets/datas/arrondissements.json');

let arrondissements = [
    {
        label:'Aucun',
        value:'',
        id: 0
    }
];
rawArrondissements.records.map((q) => {
    arrondissements.push({
        label:q.fields.l_ar.replace(' Ardt', ''),
        value:q.fields.geom_x_y[0]+','+q.fields.geom_x_y[1], 
        id:q.fields.c_ar,
        // nom:q.fields.l_ar,
        // coords:q.fields.geom_x_y,
    })
})

arrondissements = arrondissements.sort((a,b) => {
    // console.log(a.nom)
    if(a.id < b.id) { return -1;}
    if(a.id > b.id) { return 1; }
    // if(a.nom < b.nom) { return -1;}
    // if(a.nom > b.nom) { return 1; }
    return 0;
} );

exports.arrondissements = arrondissements