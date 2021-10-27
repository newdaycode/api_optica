import dataProfiles from '../models/modProfiles'


export const createProfiles = async()=>{

    dataProfiles
    .listProfiles()
    .then(result => {

        if(result.rows.length > 0) return 

        dataProfiles
        .dataProfilesMulti()        

    });

}