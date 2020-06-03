const rawQuartiers = require('../assets/datas/quartiers.json');

let quartiers = [];
rawQuartiers.map((q) => {
    quartiers.push({
        label:q.fields.l_qu,
        value:q.fields.geom_x_y[0]+','+q.fields.geom_x_y[1]
        // nom:q.fields.l_qu,
        // coords:q.fields.geom_x_y,
    })
})

quartiers = quartiers.sort((a,b) => {
    // console.log(a.nom)
    if(a.label < b.label) { return -1;}
    if(a.label > b.label) { return 1; }
    // if(a.nom < b.nom) { return -1;}
    // if(a.nom > b.nom) { return 1; }
    return 0;
} );

exports.quartiers = quartiers