import Barang from "../models/BarangModel.js";

const GetBarang = async (req, res) => {
  try {
    const barang = await Barang.findAll();
    return res.status(200).send({
      status: 200,
      message: "Data",
      data: barang,
    });
  } catch (error) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      errors: error,
    });
  }
};

const CreateBarang = async (req, res) => {
  try {
    const { NamaBarang, Quantitas, Harga, Kategori } = req.body;
    const Gambar = req.file ? `/uploads/${req.file.filename}` : null;
    const exist = await Barang.findOne({
      where: {
        NamaBarang: NamaBarang,
      },
    });
    if (exist) {
      return res.status(409).send({
        status: 409,
        message: "Nama Barang Sudah Ada",
        errors: {},
      });
    }

    const create = await Barang.create({
      NamaBarang,
      Quantitas,
      Harga,
      Kategori,
      Gambar,
    });

    return res.status(201).send({
      status: 201,
      message: "Created",
      data: create,
    });
  } catch (error) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      errors: error,
    });
  }
};

const UpdateBarang = async (req, res) => {
  try {
    const { barang_id } = req.params;
    const { NamaBarang, Quantitas, Harga, Kategori } = req.body;
    const Gambar = req.file ? `/uploads/${req.file.filename}` : null;

    const barang = await Barang.findByPk(barang_id);

    if (!barang) {
      return res.status(404).send({
        status: 404,
        message: "Barang Tidak Ada",
        data: null,
      });
    }

    barang.NamaBarang = NamaBarang;
    barang.Quantitas = Quantitas;
    barang.Harga = Harga;
    barang.Kategori = Kategori;
    barang.Gambar = Gambar;

    await barang.save();

    return res.status(200).send({
      status: 200,
      message: "Berhasil di Ubah",
      data: barang,
    });
  } catch (error) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        erorrs: error,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      errors: error,
    });
  }
};

const DeleteBarang = async (req, res) => {
  try {
    const { barang_id } = req.params;
    const barang = await Barang.findByPk(barang_id);

    if (!barang) {
      return res.status(404).send({
        status: 404,
        message: "Barang Tidak Ada",
        data: null,
      });
    }

    await barang.destroy();

    return res.status(200).send({
      status: 200,
      message: "Data Berhasil di Hapus",
      data: null,
    });
  } catch (error) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        erorrs: error,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      errors: error,
    });
  }
};


const GetBarangById = async (req,res) => {
    try {
        const {barang_id} = req.params;
        const barang = await Barang.findByPk(barang_id);
        
        if(!barang){
            return res.status(404).send({
                status: 404,
                message: "Data Not Found",
                data: null
            })
        }
        

        return res.status(200).send({
            status: 200,
            message: "barang by Id",
            data: barang
        })
    } catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
              status: 500,
              message: error.message,
              erorrs: error,
            });
          }
      
          return res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            errors: error,
          });
    }
}

export default {
  GetBarang,
  CreateBarang,
  UpdateBarang,
  DeleteBarang,
  GetBarangById
};
