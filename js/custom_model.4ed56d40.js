(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["custom_model"],{"33ba":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-column"},[a("h1",{staticClass:"headline"},[t._v("Custom model Inference")]),a("v-form",{model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[a("v-container",{staticClass:"input"},[a("v-row",[a("v-col",{staticClass:"input-name"},[a("h2",[t._v("Model")])]),a("v-col",[a("v-file-input",{staticClass:"small-input",model:{value:t.file,callback:function(e){t.file=e},expression:"file"}})],1)],1),a("v-row",[a("v-col",{staticClass:"input-name"},[a("h2",[t._v("Rank")])]),a("v-col",[a("v-text-field",{staticClass:"small-input",attrs:{min:"0",rules:[t.rules.integer],type:"number"},model:{value:t.rank,callback:function(e){t.rank=t._n(e)},expression:"rank"}})],1)],1),a("v-row",[a("v-col",{staticClass:"input-name"},[a("h2",[t._v("Shape")])]),a("v-col",t._l(t.shape,(function(e,i){return a("v-text-field",{key:i,staticClass:"d-inline-block small-input mr-2",attrs:{min:"0",rules:[t.rules.integer],type:"number"},model:{value:e.value,callback:function(a){t.$set(e,"value",t._n(a))},expression:"dim.value"}})})),1)],1),a("v-row",[a("v-col",{staticClass:"input-name"},[a("h2",[t._v("Data type")])]),a("v-col",[a("v-select",{staticClass:"small-input",attrs:{items:Object.keys(t.dataTypes)},model:{value:t.dataType,callback:function(e){t.dataType=e},expression:"dataType"}})],1)],1),a("v-row",[a("v-col",{staticClass:"input-name"},[a("h2",[t._v("Initializer")])]),a("v-col",[a("v-select",{staticClass:"small-input",attrs:{items:Object.keys(t.dataTypes[t.dataType].initializers)},model:{value:t.initializer,callback:function(e){t.initializer=e},expression:"initializer"}})],1)],1)],1)],1),a("v-btn",{staticClass:"align-self-center",attrs:{disabled:!t.canRun,color:"primary","x-large":""},on:{click:t.run}},[t._v("Predict")]),t.output?a("v-container",{staticClass:"output"},[a("v-row",[a("v-col",{staticClass:"body-1 font-weight-bold ma-0"},[t._v("Inference time:")]),a("v-col",{staticClass:"text-right"},[t._v(t._s(Math.round(t.output.time))+"ms")])],1),a("v-row",[a("v-col",{staticClass:"body-1 font-weight-bold ma-0"},[t._v("Output shape:")]),a("v-col",{staticClass:"text-right"},[t._v(t._s("("+t.output.shape.join(", ")+")"))])],1)],1):t._e()],1)},n=[],s=(a("d81d"),a("13d5"),a("d3b7"),a("3ca3"),a("cfc3"),a("9a8c"),a("a975"),a("735e"),a("c1ac"),a("d139"),a("3a7b"),a("d5d6"),a("82f8"),a("e91f"),a("60bd"),a("5f96"),a("3280"),a("3fcc"),a("ca91"),a("25a1"),a("cd26"),a("3c5d"),a("2954"),a("649e"),a("219c"),a("170b"),a("b39a"),a("72f7"),a("ddb0"),a("2b3d"),a("96cf"),a("1da1")),r=a("26d9"),l={data:function(){return{rules:{integer:function(t){return t==parseInt(t)&&t>=0||"Must be >= 0."}},dataTypes:{float32:{data:Float32Array,initializers:{"all zeros":function(){return 0}}}},file:null,model:null,valid:!1,dataType:"float32",initializer:"all zeros",rank:3,shape:[],output:null}},watch:{rank:{immediate:!0,handler:function(){while(this.rank>this.shape.length)this.shape.push({value:1});while(Math.max(this.rank,0)<this.shape.length)this.shape.pop()}},file:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=URL.createObjectURL(t.file),e.next=3,new r["a"](a);case 3:t.model=e.sent;case 4:case"end":return e.stop()}}),e)})))()}},computed:{canRun:function(){return null!==this.model&&this.valid}},methods:{run:function(){var t=this.shape.map((function(t){return t.value})),e=t.reduce((function(t,e){return t*e}),1),a=new this.dataTypes[this.dataType].data(e),i=new r["b"](a,t),n=performance.now(),s=this.model.predict(i),l=performance.now();this.output={time:l-n,shape:s.shape()}}},name:"CustomModelDemo"},u=l,o=(a("da85"),a("2877")),c=a("6544"),d=a.n(c),h=a("8336"),f=a("62ad"),p=a("a523"),v=a("23a7"),m=(a("4de4"),a("7db0"),a("4160"),a("caad"),a("07ac"),a("2532"),a("159b"),a("5530")),b=a("58df"),w=a("7e2b"),_=a("3206"),g=Object(b["a"])(w["a"],Object(_["b"])("form")).extend({name:"v-form",inheritAttrs:!1,props:{lazyValidation:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,a=function(t){return t.$watch("hasError",(function(a){e.$set(e.errorBag,t._uid,a)}),{immediate:!0})},i={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(function(n){n&&(e.errorBag.hasOwnProperty(t._uid)||(i.valid=a(t)))})):i.valid=a(t),i},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var a=this.watchers.find((function(t){return t._uid===e._uid}));a&&(a.valid(),a.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(m["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}),y=a("0fd9"),C=a("b974"),k=a("8654"),x=Object(o["a"])(u,i,n,!1,null,"4f079a99",null);e["default"]=x.exports;d()(x,{VBtn:h["a"],VCol:f["a"],VContainer:p["a"],VFileInput:v["a"],VForm:g,VRow:y["a"],VSelect:C["a"],VTextField:k["a"]})},"3a4c":function(t,e,a){},da85:function(t,e,a){"use strict";var i=a("3a4c"),n=a.n(i);n.a}}]);
//# sourceMappingURL=custom_model.4ed56d40.js.map