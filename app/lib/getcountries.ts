import countries from 'world-countries';

const countriesFormatted =countries.map((item)=>({
    value: item.cca2,
    label: item.name.common,
    flag:item.flag,
    region:item.region,
    latLang:item.latlng,
}));

 export     const useCountries=()=>{
    const getAllCountries =()=> countriesFormatted
    const getcountriesvalue=(value:string)=> {
        return countriesFormatted.find((item)=>item.value === value);
    };

    return {
        getAllCountries,
        getcountriesvalue,
    };
};