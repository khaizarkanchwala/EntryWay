const countryStateInfo={
    USA:{
        Califonia:{
            "los Angeles":["1","2","3","4"],
            "san Diego":["5","6","7"],
        },
        Texas:{
            Dallas:["8","9"],
            Austin:["10","11"],
        },
    },
    Germany:{
        bavaria:{
            "los Angeles":["1","2","3","4"],
            "san Diego":["5","6","7"],
        },
        hessen:{
            Dallas:["8","9"],
            Austin:["10","11"],
        },
    },
    INDIA:{
        "Andhra Pradesh":{
            Amaravati:["444601"],
            Visakhapatnam:["530001"],
            vijayawada:["520001"],
            Guntur:["522002"],
            Nellore:["524001"],
            Tirupati:["517501"],
        },
        "Arunachal Pradesh":{
            Itanagar:["791111"],
            Tawang:["790104"],
            Bhismaknagar:["792110"],
            Pasighat:["791102"],
            Ziro:["791220"],
            Bomdil:["790001"],
        },
        "Assam":{
            Dispur:["781005"],
            Guwahati:["781001"],
            Tezpur:["784001"],
            Dibrugarh:["786001"],
            Silchar:["788001"],
            "North Lakhimpur":["787001"],
        },
        Bihar:{
            Patna:["800001"],
            Gaya:["823001"],
            Biharsharif:["803101"],
            Darbhanga:["846001"],
            Bhagalpur:["812001"],
            
        },
        Chattisgarh:{
            Bilaspur:["495001"],
            Korba:["495450"],
            "Durg-Bhilainagar":["490001"],
            Raigarh:["496001"],
            Rajnandgaon:["491441"],
            
        },
        Goa:{
            Panaji:["403301"],
            "Vasco-da-gama":["403711"],
            Ponda:["403401"],
            Margao:["403601"],
            Mapusa:["403507"],
            "Goa valha":["403108"],
        },
        Telangana:{
            Hyderabad:["500001"],
            Warangal:["506001"],
            Nizamabad:["503001"],
            Karimnagar:["505001"],
            Adilabad:["504001"],
            Khammam:["507001"],
        },
        "Uttar Pradesh":{
            Lucknow:["226001"],
            Noida:["110096"],
            Agra:["223007"],
            Allahabad:["211001"],
            Kanpur:["208001"],
            Varanasi:["212001"],
        },
        Maharashtra:{
            Nagpur:["440001"],
            Sholapur:["413001"],
            Puna:["394246"],
            Nashik:["420003"],
            Aurangabad:["431001"],
            Mumbai:["230532"],
        },
        Rajasthan:{
            Jaipur:["302001"],
            Jaisalmer:["345001"],
            Udaipur:["313001"],
            Jodhpur:["112001"],
            Ajmer:["305001"],
            
        },
    },
};

window.onload=function(){
    const countryselection=document.querySelector("#Country");
    let     stateselection=document.querySelector("#State");
     let    cityselection=document.querySelector("#City");
     let    zipselection=document.querySelector("#Zip");

    // console.log(countryselection);


    stateselection.disabled=true;
    cityselection.disabled=true;
    zipselection.disabled=true;

    stateselection.length=1;
    cityselection.length=1;
    zipselection.length=1;

    for(let country in countryStateInfo){
        countryselection.options[countryselection.options.length]=new Option(
            country,
            country
        );

    }

    countryselection.onchange=(e)=>{
        stateselection.disabled=false;

        stateselection.length=1;
        cityselection.length=1;
        zipselection.length=1;

        for(let state in countryStateInfo[e.target.value]){
            stateselection.options[stateselection.options.length]=new Option(
                state,
                state
            );
    
        }
        
    };


    stateselection.onchange=(e)=>{
        cityselection.disabled=false;
        cityselection.length=1;
        zipselection.length=1;

        for(let city in countryStateInfo[countryselection.value][e.target.value]){
            cityselection.options[cityselection.options.length]=new Option(
                city,
                city
            );
    
        }
        
    };

    cityselection.onchange=(e)=>{
        zipselection.disabled=false;
        
        zipselection.length=1;
    let zips=countryStateInfo[countryselection.value][stateselection.value][e.target.value];

      for(let i=0;i<zips.length;i++){
        zipselection.options[zipselection.options.length]=new Option(
            zips[i],
            zips[i]
        );
        
      }
    };
};
