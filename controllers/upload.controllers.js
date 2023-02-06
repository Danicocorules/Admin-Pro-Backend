const path = require('path');
const response = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const updateImgs = require('./../helpers/update-img');

const uploadFile = async ( req, res = response ) => {

    const type = req.params.type;
    const id = req.params.id;
    
    const validTypes = ['hospitals', 'doctors', 'usuarios'];

    if ( !validTypes.includes( type ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'Type not valid'
        })
    }

    // Check if really document exist
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }

    //Process img
    const file = req.files.image;
    const nameSplit = file.name.split('.');
    const formatFile = nameSplit[ nameSplit.length - 1 ];

    //Validate format file
    const validFormats = ['jpg', 'jpeg', 'gif', 'png'];
    if ( !validFormats.includes(formatFile) ) {
        return res.status(400).json({
            ok: false,
            msg: 'This format file is not valid.'
        });
    }

    // Generate name on file
    const fileName = `${ uuidv4() }.${formatFile}`;

    // Save path for file
    const path = `./uploads/${type}/${fileName}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv( path , (err) => {

        if (err) { 
            console.log(err);
            return res.status(500).json({
                ok: false,
            });
        }

        // Update database
        updateImgs( type, id, fileName );

        res.json({
            ok: true,
            msg: 'File uploaded!',
            fileName
        });
    });
   
}

const getImg = ( req, res = respones ) => {

    const type = req.params.type;
    const photo = req.params.img;

    const pathImg = path.join( __dirname, `../uploads/${type}/${photo}` );

    //img default img
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile(pathImg); 
    } else {
        const pathImgErr = path.join( __dirname, `../uploads/no-img.png` );
        res.sendFile(pathImgErr);
    }

}

module.exports = { uploadFile, getImg };