import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productNo: { type: Number },
    productId: { type: String,requiredd: true, trim: true },
    name: { type: String, requiredd: true, trim: true },
    brand: { type: String, requiredd: true, trim: true },
    ditails: { type: String, requiredd: true, trim: true },
    catergory: { type: String, requiredd: true, trim: true },
    rating: { type: Number, requiredd: true, trim: true },

    operatingSystem: { type: String, trim: true },
    memoryStorageCapacity: { type: Number, trim: true },
    storages: { type: [Number], default: 0 },
    storagesPrice: { type: Object },
    ramMemorySize: { type: Number },
    screenSize: { type: String },
    resolution: { type: String },

    formFactor: { type: String, trim: true },
    impedance: { type: String, trim: true },
    earPlacement: { type: String, trim: true },

    materialComposition: { type: String, trim: true },
    Pattern: { type: String, trim: true },
    fittype: { type: String, trim: true },
    sleevetype: { type: String, trim: true },
    collarStyle: { type: String, trim: true },
    gender: { type: String, trim: true },

    shoeSize: { type: [Number], default: [] },

    materialType: { type: String, trim: true },
    closureType: { type: String, trim: true },
    heelType: { type: String, trim: true },
    waterResistanceLevel: { type: String, trim: true },
    sole: { type: String, trim: true },
    style: { type: String, trim: true },

    batteryCapacity: { type: String },

    sport: { type: String },
    material: { type: String },

    neckStyle: { type: String, trim: true },
    manufacturer: { type: String, trim: true },

    refreshRate: { type: String },
    displayTechnology: { type: String },
    specialFeature: { type: String },
    includedComponents: { type: String },
    connectivityTechnology: { type: String },
    screenSizes: { type: Number },
    screenSizesPrice: { type: Object },



    about: { type: [String] },
    price: { type: Number ,required:true},
    mrp: { type: Number },
    mainImg: { type: String },
    mainColor: { type: String},
    imgs: { type: Array },
    collectionsImgs: { type: Object },

    size: { type: [String] },

    qty: { type: Number, default: 1 },
    selectStorage: { type: Number },
    selectRam: { type: Number },
    selectSize: { type: mongoose.Schema.Types.Mixed },
    selectColor: { type: String },
},{timestamps:true})

export const wishList = mongoose.model("wishlist", wishListSchema)