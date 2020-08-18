import axios from 'axios';
let url
if(process.env.NODE_ENV === 'production'){
     url = "api/posts";
  }else{
     url = "http://192.168.0.7:5555/api/posts";
    
}

class Service {
  /* static async getData() {
    
    const res = await axios.get(url);
    const data = await res.data;

    return data;
  } */
  static  getData() {
    return new Promise((resolve, reject)=>{
        try{
            axios
              .get(url)
              .then((res) => {
                resolve(res.data);
              })
              .catch((err) => reject(err));
        }catch(err){
            reject(err)
        }
    })
  }
  

  /* static async getObjectUsingId(id) {
    const res = await axios.post(url + "/getObjectUsingId", { id: id });
    const data = await res.data;

    return data;
  } */

  static getObjectUsingId(id) {
    console.log(url)

    console.log(url + "/getObjectUsingId")
    return new Promise((resolve, reject)=>{
        try{
            axios.post(url + "/getObjectUsingId", { id: id })
            .then((result)=>{
                resolve(result.data);
            }).catch(err => reject(err))
        }
        catch(err){
            reject(err)
        }
    })
    // const res = await axios.post(url + "/getObjectUsingId", { id: id });
    // const data = await res.data;

    // return data;
  }

  /* static async updateObjectUsingId(data) {
    const res = await axios.post(url + "/getObjectUsingId", data);
    const temp_data = await res.data;

    return temp_data;
  } */

  static updateObjectUsingId(data) {
    return new Promise((resolve, reject)=>{
        try{
            axios.post(url + "/updateObjectUsingId", data)
                .then(res=>{
                    resolve(res.data)
                })
                .catch(err=> reject(err))
        }catch(err){
            reject(err)
        }
    })
  }

  /* static postYourPoll(data) {
    return axios.post(url, data);
  } */

  static postYourPoll(data) {
      console.log(data)
    return new Promise((resolve, reject) => {
      try {
        axios
          .post(url, data)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {  
            reject(err)});
      } catch (err) {
        reject(err);
      }
    });
  }
}


export default Service;