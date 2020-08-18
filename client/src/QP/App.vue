<template>
  <div id="app">
  <title>Public-Poll</title>
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="">
        <img src="/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
        Public-Poll
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="/">Create New Poll<span class="sr-only">(current)</span></a>
          </li>
          <!--<li class="nav-item">
            <a class="nav-link" href="/Poll">Poll Vote</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">Share</a>
          </li>-->
        </ul>
      </div>
    </nav>
    <div class="pt-5 d-flex flex-column p-0 pl-2 pr-2" >
        <div class= "text-center h3">Create a Poll in Seconds</div>
        <div class="mt-3 p-0 col-12 col-sm-11 col-md-9 col-lg-7 col-xl-5 card container-fluid justify-content-center"  >
          <ul class="nav justify-content-left" style="background-color:#F7F7F7">
            <li class="nav-item">
              <a class="nav-link active" href="">Question</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="">Themes</a>
            </li>
          </ul>
          <h5 class="card-header">
            <div class="input-group"> 
              <textarea v-model='Question' class="form-control" aria-label="With textarea" placeholder="Type Question here"></textarea>
            </div>
          </h5>
          <div class="card-body d-flex flex-column pb-5" >
            <!-- <input type="text" v-for = "item in Question_options" :key='item.id' v-model='item.text' @keyup="checkInput(item.id)" @click="checkInput(item.id)"  class="mt-2 form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Type your answer here"> -->
            <input type="text" v-for = "item in Question_options" :key='item.id'  v-bind:value="item.text" v-on:input='item.text = $event.target.value'  @keyup="checkInput(item.id)" @click="checkInput(item.id)"  class="mt-2 form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Type your answer here">
            <div v-if="isPollInProcess" class="btn col-5 mt-4 btn-primary container-fluid justify-content-center">Creating Poll....</div>
            <div v-else-if="!isPollCreated" class="btn col-5 mt-4 btn-primary container-fluid justify-content-center" @click="publishPoll">Create Poll</div>
            <div v-else class="btn col-5 mt-4 btn-primary container-fluid justify-content-center">Poll is Created</div>  
            
            <span v-if = "isPollCreated">Share: </span>
            <a v-if = "isPollCreated" :href="public_poll_link" >{{public_poll_link}}</a>
            <div v-if = "isAlert" class="alert alert-danger mt-3 mb-0 p-1">
              <strong>Danger!</strong> Check your Question and Atleast two options are filled 
            </div>
            <div v-if = "isServerNotFound" class="alert alert-danger mt-3 mb-0 p-1">
              <strong>Danger!</strong> Server Not Found 
            </div>
          </div>
        </div>
    </div>
    <!--<p>{{Question}}{{Question_options}}{{isPollInProcess}}</p>-->
  </div>
</template>


<script>
import "./qp.css";
import api from "../API/api.js";

export default {
  name: 'App',
  data: function (){
      return {
          Question: '',
          isPollCreated: false,
          isServerNotFound: false,
          isAlert: false,
          isPollInProcess: false,
          Number_of_options: 1,
          public_poll_link: "",
          Question_options : [
            {id: 1 , text : '', vote: 0}
          ]
      }
  },
  methods: {
    checkInput(_id) {
      if(_id == this.Number_of_options && this.Question_options[_id-1].text != ''){
        this.Number_of_options += 1;
        this.Question_options.push({id: _id+1, text:'', vote:0 })
      }
      this.isAlert = false
      console.log("he", _id)
    },

    /* async publishPoll(){
      console.log("Hello")
      this.isPollInProcess = true
      let see = await api.postYourPoll({"Question": this.Question , "Question_options": this.Question_options})
      await console.log(window.location.href+see.data , "sjijdasdjias")
      this.isPollCreated = true

      this.public_poll_link = window.location.href + see.data;
      this.isPollInProcess = false
    } */
     publishPoll(){
      if(this.Question !== "" && this.Question_options.filter(item=> item.text != '').length >= 2){
        this.isServerNotFound = false;
        this.isPollInProcess = true
        this.isAlert = false
        api.postYourPoll({"Question": this.Question , "Question_options": this.Question_options})
          .then(see =>{
            // console.log(window.location.href+see.data , "sjijdasdjias")
            this.isPollCreated = true
            this.public_poll_link = window.location.href + see.data;
            this.isPollInProcess = false
          })
          .catch(err =>{ 
            this.isPollInProcess = false;
            this.isServerNotFound = true;
            console.warn(err);
            })
      }else{
        this.isAlert = true;
        console.log("You dumb")
      }
    }
  },
}

// <input type="text" class="mt-2 form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Type your ans here">
// <input type="text" class="mt-2 form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">

// <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
</script>
<style>
  .navbar-collapse.in {
    display: block !important;
  }
</style>