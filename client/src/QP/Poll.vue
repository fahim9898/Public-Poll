<template>
  <div id="app d-flex p-5">
    <div class="col-11 col-sm-11 col-md-9 col-lg-9 col-xl-8 container-fluid align-item-center justify-content-center" :style="{'border': 'solid #DBD9D9 1px', 'border-radius': '7px', 'margin-top':'140px'}">
      <h4 class="align-item-center pl-3 mb-3 mt-4 p-1" style="background-color: #00355F; color: #FFFFFF; border-radius: 7px">{{Question}}</h4>
      <div class="mt-2 mb-2 input-group" v-for="item in Question_options" :key=item.id :item= item>
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="radio" name="ans" aria-label="Radio button for following text input" style="cursor: pointer" @click = "last_clicked_which_radio_btn = item.id">
          </div>
        </div>
        <h3 type="text" class="form-control d-flex" style="white-space: nowrap;" aria-label="Text input with radio button"><span>{{item.text}} </span> <p v-if = "is_show_result" class="text-right w-100">{{item.vote}}</p></h3>
      </div>
      <div class="d-flex">
        <div class="btn col-5 mt-2 mb-2 btn-info container-fluid justify-content-center" @click = "updateVote">Vote</div>
        <div class="btn col-5 mt-2 mb-2 btn-info container-fluid justify-content-center" @click = "is_show_result = !is_show_result">View Result</div>
      </div>
    </div>
    <!--<p>{{Question}}{{Question_options}}</p>-->
  </div>
</template>

<script>
import "./qp.css";
import api from "../API/api.js";

export default {
  name: 'App',
  data: function (){
      return {
          last_clicked_which_radio_btn : 0,
          Question: 'Waiting............',
          isPollCreated: false,
          Number_of_options: 1,
          is_show_result: false,
          is_clikable_vote : true,
          Question_options : []
      }
  },
  /* async created(){
    if(typeof getUrlVars()["id"] !== "undefined"){ 
      let data = await api.getObjectUsingId(getUrlVars()["id"]);
      this.Question = data[0]['question']
      this.Question_options = data[0]['Question_options'].filter(item=> item.text != '');
      console.log(data)
    }else{
      console.log("Why this things to me")
      window.location.pathname = '/'
    }
  }, */
  created(){
    if(typeof getUrlVars()["id"] !== "undefined"){ 
      // console.log("Helloooo---")
      api.getObjectUsingId(getUrlVars()["id"]).then((data)=>{
        this.Question = data[0]['question']
        this.Question_options = data[0]['Question_options'].filter(item=> item.text != '');
      }).catch(err => {
        window.location.pathname = '/'
        window.location.href = window.location.href.split("?")[0]
        console.log(err)
        })
    }else{
      console.log("Why this things to me")
      window.location.pathname = '/'
    }
  },
  methods: {
    checkInput(_id) {
      if(_id == this.Number_of_options && this.Question_options[_id-1].text != ''){
        this.Number_of_options += 1;
        this.Question_options.push({id: _id+1, text:'', vote:0 })
      }
      console.log("he", _id)
    },

     updateVote(){
      if(this.last_clicked_which_radio_btn != 0  && this.is_clikable_vote && typeof localStorage[getUrlVars()["id"]] == "undefined" ){
          this.Question_options = this.Question_options.map(item=> {
            if(item.id == this.last_clicked_which_radio_btn){
              item.vote += 1
              this.is_clikable_vote = false
              api.updateObjectUsingId({id: getUrlVars()["id"],question:this.Question ,Question_options: this.Question_options})
                .then(()=>{
                })
                .catch(err => console.log(err))
            }
            return item
          })
          localStorage[getUrlVars()["id"]] = true ;
          // console.log({"id": getUrlVars()["id"],"question":this.question ,"Question_options": this.Question_options})
      }
    },

    /* async publishPoll(){
      await api.postYourPoll({"Question": this.Question , "Question_options": this.Question_options})
      this.isPollCreated = true
    } */
  },
}

function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


// <input type="text" class="mt-2 form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Type your ans here">
// <input type="text" class="mt-2 form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">

// <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
</script>

