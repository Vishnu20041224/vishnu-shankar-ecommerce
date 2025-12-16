import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { filterProducts } from "../redux/slice/productSlice"
import { useSelector, useDispatch } from "react-redux"

const FilterProduct = ({ data }) => {

  const dispatch = useDispatch()

  const alldata = useSelector(state => state.product.allproducts)
  console.log(alldata)

  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [styles, setStyles] = useState([]);
  const [storages, setStorages] = useState([]);
  const [ram, setRam] = useState([]);
  const [screenSize, setScreenSize] = useState([]);
  const [operatingSystem, setOperatingSystem] = useState([]);
  const [gender, setGender] = useState([]);
  const [fittypes, setFittypes] = useState([]);
  const [sleevetype, setSleevetype] = useState([]);
  const [sports, setSports] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [refreshRates, setRefreshRate] = useState([]);
  const [resolutions, setResolutions] = useState([]);
  const [screenSizes, setScreenSizes] = useState([]);



  // USER SELETE

  const [selectbrands, setSelectBrands] = useState([]);
  const [selectcolors, setSelectColors] = useState([]);
  const [selectstyles, setSelectStyles] = useState([]);
  const [selectstorages, setSelectStorages] = useState([]);
  const [selectram, setSelectRam] = useState([]);
  const [selectscreenSize, setSelectScreenSize] = useState([]);
  const [selectoperatingSystem, setSelectOperatingSystem] = useState([]);
  const [selectgender, setSelectGender] = useState([]);
  const [selectfittypes, setSelectFittypes] = useState([]);
  const [selectsleevetype, setSelectSleevetype] = useState([]);
  const [selectsports, setSelectSports] = useState([]);
  const [selectmaterials, setSelectMaterials] = useState([]);
  const [selectrefreshRates, setSelectRefreshRate] = useState([]);
  const [selectresolutions, setSelectResolutions] = useState([]);
  const [selectscreenSizes, setSelectScreenSizes] = useState([]);



  const filterProduct = async (query) => {
    let res = await dispatch(filterProducts(query))
    console.log(res)
  }


//   useEffect(() => {
//   const allSelected = {
//     brand: selectbrands,
//     color: selectcolors,
//     style: selectstyles,
//     storage: selectstorages,
//     ram: selectram,
//     screenSize: selectscreenSize,
//     operatingSystem: selectoperatingSystem,
//     gender: selectgender,
//     fittype: selectfittypes,
//     sleeveType: selectsleevetype,
//     sport: selectsports,
//     material: selectmaterials,
//     refreshRate: selectrefreshRates,
//     resolution: selectresolutions,
//     screenSizes: selectscreenSizes
//   }

//   const query = {}
//   Object.keys(allSelected).forEach(key => {
//     if (allSelected[key].length > 0) {
//       query[key] = allSelected[key]
//     }
//   })

//   // Only call filter if query has something selected
//   if (Object.keys(query).length > 0) {
//     dispatch(filterProducts(query))
//       .then(res => console.log("Filtered:", res))
//       .catch(err => console.error(err))
//   }

// }, [
//   selectbrands,
//   selectcolors,
//   selectstyles,
//   selectstorages,
//   selectram,
//   selectscreenSize,
//   selectoperatingSystem,
//   selectgender,
//   selectfittypes,
//   selectsleevetype,
//   selectsports,
//   selectmaterials,
//   selectrefreshRates,
//   selectresolutions,
//   selectscreenSizes
// ])




  useEffect(() => {
    const uniqueBrands = [...new Set(data.map(d => d.brand))];
    setBrands(uniqueBrands);

    const uniqueColors = [...new Set(data.map(d => d.mainColor))];
    setColors(uniqueColors);


    const uniqueStyles = [...new Set(data.map(d => d.style))];
    setStyles(uniqueStyles);

    const uniqueStorages = [...new Set(data.map(d => d.memoryStorageCapacity))];
    setStorages(uniqueStorages);

    // ramMemorySize
    const uniqueram = [...new Set(data.map(d => d.ramMemorySize))];
    setRam(uniqueram);

    // screenSize

    const uniquescreenSize = [...new Set(data.map(d => d.screenSize))];
    setScreenSize(uniquescreenSize);

    // operatingSystem
    const uniqueOperatingSystem = [...new Set(data.map(d => d.operatingSystem))];
    setOperatingSystem(uniqueOperatingSystem);

    // fittype
    const uniqueFittype = [...new Set(data.map(d => d.fittype))];
    setFittypes(uniqueFittype);

    // uniqueGender
    const uniqueGender = [...new Set(data.map(d => d.gender))];
    setGender(uniqueGender);

    // uniqueGender
    const uniqueSleevetype = [...new Set(data.map(d => d.sleevetype))];
    setSleevetype(uniqueSleevetype);

    const uniqueSport = [...new Set(data.map(d => d.sport))];
    setSports(uniqueSport);

    const uniqueMaterials = [...new Set(data.map(d => d.materialComposition))];
    setMaterials(uniqueMaterials);

    const uniqueRefreshRate = [...new Set(data.map(d => d.refreshRate))];
    setRefreshRate(uniqueRefreshRate);

    const uniqueResolution = [...new Set(data.map(d => d.resolution))];
    setResolutions(uniqueResolution);

    const uniqueScreenSizes = [...new Set(data.map(d => d.screenSizes))];
    setScreenSizes(uniqueScreenSizes);

  }, [data]);

  return (
    <div className='w-60 bg-gray-100 h-fit'>
      <h1>Filter</h1>

      {brands.length > 1 && <div className="ps-4 py-3">
        <h1 className="mb-3 font-semibold text-base uppercase">Brand :</h1>
        {brands.map(brand => (
          <div onClick={() => setSelectBrands((pres) => pres.includes(brand) ? pres.filter((item) => item !== brand) : [brand, ...pres])} key={brand} className="flex items-center gap-3 mb-3 ">
            <Checkbox checked={selectbrands.includes(brand)} id={brand} className="cursor-pointer" />
            <Label htmlFor={brand}>{brand}</Label>
          </div>
        ))}
      </div>}

      {colors.length > 1 && <div className="ps-4">
        <h1 className="mb-3 font-semibold text-base uppercase">Colors :</h1>
        {colors.map(color => (
          <div onClick={() => setSelectColors((pres) => pres.includes(color) ? pres.filter((item) => item !== color) : [color, ...pres])} key={color} className="flex items-center gap-3 mb-3 cursor-pointer">
            <Checkbox id={color} className="cursor-pointer" />
            <Label htmlFor={color}>{color}</Label>
          </div>
        ))}
      </div>}

      {styles.length > 2 && <div className="ps-4">
        <h1 className="mb-3 font-semibold text-base uppercase">styles :</h1>
        {styles.map(style => (
          <div key={style} className="flex items-center gap-3 mb-3 cursor-pointer">
            <Checkbox id={style} className="cursor-pointer" />
            <Label htmlFor={style}>{style}</Label>
          </div>
        ))}
      </div>}

      {storages.length > 1 && <div className="ps-4">
        <h1 className="mb-3 font-semibold text-base uppercase">storage :</h1>
        {storages.map(storage => (
          <div key={storage} className="flex items-center gap-3 mb-3 cursor-pointer">
            <Checkbox id={storage} className="cursor-pointer" />
            <Label htmlFor={storage}>{storage >= 1000 ? 1 : storage} <span>{storage >= 1000 ? "TB" : "GB"}</span> </Label>
          </div>
        ))}
      </div>}

      {ram.length > 1 && <div className="ps-4">
        <h1 className="mb-3 font-semibold text-base uppercase">RAM :</h1>
        {ram.map(r => (
          <div key={r} className="flex items-center gap-3 mb-3 cursor-pointer">
            <Checkbox id={r} className="cursor-pointer" />
            <Label htmlFor={r}>{r} GB</Label>
          </div>
        ))}
      </div>}


      {screenSize.length > 1 && <div className="ps-4">
        <h1 className="mb-3 font-semibold text-base uppercase">screen Size :</h1>
        {screenSize.map(screen => (
          <div key={screen} className="flex items-center gap-3 mb-3 cursor-pointer">
            <Checkbox id={screen} className="cursor-pointer" />
            <Label htmlFor={screen}>{screen}</Label>
          </div>
        ))}
      </div>}

      {operatingSystem.length > 1 && <div className="ps-4">
        <h1 className="mb-3 font-semibold text-base uppercase">operatingSystem :</h1>
        {operatingSystem.map(system => (
          <div key={system} className="flex items-center gap-3 mb-3 cursor-pointer">
            <Checkbox id={system} className="cursor-pointer" />
            <Label htmlFor={system}>{system}</Label>
          </div>
        ))}
      </div>}

      {fittypes.length > 1 && <div className="ps-4">
        <h1 className="mb-3 font-semibold text-base uppercase">fittype:</h1>
        {fittypes.map(fittype => (
          <div key={fittype} className="flex items-center gap-3 mb-3 cursor-pointer">
            <Checkbox id={fittype} className="cursor-pointer" />
            <Label htmlFor={fittype}>{fittype}</Label>
          </div>
        ))}
      </div>}

      {gender.length > 1 && <div className="ps-4">
        <h1 className="mb-3 font-semibold text-base uppercase">gender:</h1>
        {gender.map(gen => (
          <div key={gen} className="flex items-center gap-3 mb-3 cursor-pointer">
            <Checkbox id={gen} className="cursor-pointer" />
            <Label htmlFor={gen}>{gen}</Label>
          </div>
        ))}
      </div>}

      {sleevetype.length > 1 && <div className="ps-4">
        <h1 className="mb-3 font-semibold text-base uppercase">sleevetype :</h1>
        {sleevetype.map(sleeve => (
          <div key={sleeve} className="flex items-center gap-3 mb-3 cursor-pointer">
            <Checkbox id={sleeve} className="cursor-pointer" />
            <Label htmlFor={sleeve}>{sleeve}</Label>
          </div>
        ))}
      </div>}

      {sports.length > 2 && <div className="ps-4">
        <h1 className="mb-3 font-semibold text-base uppercase">sports :</h1>
        {sports !== "" && sports.map(sport => (
          <div key={sport} className="flex items-center gap-3 mb-3 cursor-pointer">
            <Checkbox id={sport} className="cursor-pointer" />
            <Label htmlFor={sport}>{sport}</Label>
          </div>
        ))}
      </div>}

      {refreshRates.length > 1 && <div className="ps-4">
        <h1 className="mb-3 font-semibold text-base uppercase">sports :</h1>
        {sports.map(sport => (
          <div key={sport} className="flex items-center gap-3 mb-3 cursor-pointer">
            <Checkbox id={sport} className="cursor-pointer" />
            <Label htmlFor={sport}>{sport}</Label>
          </div>
        ))}
      </div>}

      {resolutions.length > 1 && <div className="ps-4">
        <h1 className="mb-3 font-semibold text-base uppercase">resolutions :</h1>
        {resolutions.map(resolution => (
          <div key={resolution} className="flex items-center gap-3 mb-3 cursor-pointer">
            <Checkbox id={resolution} className="cursor-pointer" />
            <Label htmlFor={resolution}>{resolution}</Label>
          </div>
        ))}
      </div>}

      {screenSizes.length > 1 && <div className="ps-4">
        <h1 className="mb-3 font-semibold text-base uppercase">screenSizes :</h1>
        {screenSizes.map(screenSize => (
          <div key={screenSize} className="flex items-center gap-3 mb-3 cursor-pointer">
            <Checkbox id={screenSize} className="cursor-pointer" />
            <Label htmlFor={screenSize}>{screenSize} inches</Label>
          </div>
        ))}
      </div>}



    </div >
  )
}

export default FilterProduct
