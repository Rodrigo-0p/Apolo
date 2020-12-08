//importamos router
const router = require('express').Router();

router.get('/', (req, res) => {
     res.json({
         error:null,
         data:{
             title:'mi ruta protegida',
             usuario: req.usuario 
         }
     });
});

module.exports = router;