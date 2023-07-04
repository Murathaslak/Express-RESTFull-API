const router = require("express").Router();
let data = require("../data.js");

router.get("/", (req,res) => {
    res.status(200).json(data);
});

let next_id = 4;
router.post("/",(req,res) => {
    let yeni_aktor = req.body;
    yeni_aktor.id = next_id;
    next_id++;
    data.push(yeni_aktor);
    res.status(201).json(yeni_aktor);
});


router.delete("/:id", (req,res) => {
    const silinecekAktorId = req.params.id;
    const silinecekAktor = data.find(aktor => aktor.id === Number(silinecekAktorId))

    if(silinecekAktor) {
        data = data.filter(aktor => aktor.id !== Number(silinecekAktorId));
        res.status(204).end();
    } else {
        res.status(404).json({postMessage: "Silmeye çalıştığınız aktor yok"});
    }
});

router.put("/:id", (req, res) => {
    const editId = req.params.id;
    const editAktor = req.body;
    const istenenAktor = data.find((aktor) => aktor.id === Number(editId));
  
    if (istenenAktor) {
      istenenAktor.isim = editAktor.isim;
      istenenAktor.filmler = editAktor.filmler;
      res.status(200).json(istenenAktor);
    } else {
      res.status(404).json({ message: "Aktör bulunamadı." });
    }
  });
  
router.get("/:id", (req,res) => {
    // gelen veriyi burada yakalayabiliriz 1.yöntem
    // console.log("req.params", req.params); 

    // post requestleri kullanırken aşağıda şekilde gelenleri yakalayabiliriz.
    //console.log("req.body", req.body);

    const { id } = req.params;
    const aktor = data.find(aktor => aktor.id === parseInt(id));
    if(aktor) {
        res.status(200).json(aktor);
    } else {
        res.status(404).send("Aradığınız aktor bulunamadı...")
    }
});


module.exports = router;