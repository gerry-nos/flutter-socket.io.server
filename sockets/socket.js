const { io } = require('../index');
const Band = require('../models/band');
const Bands =  require('../models/bands');
const bands = new Bands();
console.log('init server')


bands.addBand( new Band( 'Queen' ));
bands.addBand( new Band( 'charly montana' ));
bands.addBand( new Band( 'El tri' ));
bands.addBand( new Band( 'El aragan' ));

console.log(bands)

//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands', bands.getBands() )
    client.on('disconnect', () => { 
       // console.log('Cliente desconectado');
});

    client.on('mensaje',(payload)=>{
    //console.log('Mensaje!',payload);    

        io.emit( 'mensaje',{admin: 'Nuevo mensaje'} )
});


        client.on('vote-band', (payload)=>{
                bands.voteBand(payload.id);
                console.log(payload);
                io.emit('active-bands',bands.getBands());
        });



        
        client.on('add-band', (payload)=>{
            const newBand = new Band(payload.name);
            bands.addBand(newBand);
            console.log(payload);
            io.emit('active-bands',bands.getBands());
    });

    client.on('delete-band', (payload)=>{        
        bands.deleteBand(payload.id);
        console.log(payload);
        io.emit('active-bands',bands.getBands());
});



/*
client.on('emitir-mensaje',( payload )=>{
    //io.emit('nuevo-mensaje',payload);
    
    //1console.log(payload);  
    //Emite un nuevo mensaje excepto añ que genero el mensaje  
    client.broadcast.emit('nuevo-mensaje',payload);
});*/

});