let vueApp =new Vue({
  el: '#blackFriday',
  data: {
    
    // описание ошибок
    errors: {
      lastName: "Ваше прізвище кирилецею та без цифр",
      Name: "Ваше ім'я кирилецею та без цифр",
      middleName: "Як Вас по-батькові кирилецею та без цифр",
      phone: "Телефон має 10 цифр",
      idNumber: "ІПН має 10 цифр",
      selectEmployment: 'Виберіть варіант'
    },

    // когда поле без ошибок и заолнено, становится true
    validInputs: {
      inputLastName: false,
      inputName: false,
      inputMiddleName: false,
      inputPhone: false,
      inputIdNumber: false,
      selectEmployment: false,
      selectRegion: false,
      inputConditions: false
    },

    // если true - кнопка в форме disabled, false - активна
    formBtnDisabled: true,

  },

  methods: {
    // маска для текстовых полей (ФИО)
    maskText: function(e) {
      let id = e.target.id,
          thisValue = e.target.value,
          textExample = /[^а-яА-ЯІіЬьЇїъЁёы]/;

       e.target.classList.remove('form-input-invalid');
      e.target.nextElementSibling.innerText = "";
      
      switch (id) {
        case 'inputLastName':
          problem = this.errors.lastName;
          break;

        case 'inputName':
          problem = this.errors.Name;
          break;

        case 'inputMiddleName':
          problem = this.errors.middleName;
          break;
      }

      if (textExample.test(thisValue)) {
          thisValue = thisValue.replace(textExample, '');
          e.target.value = thisValue;
      }
      if (e.type == "blur"){
        if (e.target.value.length < 2) {
          e.target.classList.add('form-input-invalid');
          e.target.nextElementSibling.innerText = problem;
          this.validInputs[e.target.id] = false;
        } else{
            this.validInputs[e.target.id] = true;
        }
        this.validInputsCheck()
      }
    },

    // маска для цифровых полей (телефон, ИНН)
    maskNumbers: function(e) {
      
      let idExample = '__ __ __ __ __',
          phoneExample = '+38 (___) ___-__-__',
          example,
          i = 0,
          id = e.target.id,
          problem;

      e.target.classList.remove('form-input-invalid');
      e.target.nextElementSibling.innerText = "";


      switch (id) {
        case 'inputPhone':
          example = phoneExample;
          notFullFill = 19;
          problem = this.errors.phone;
          break;
  
        case 'inputIdNumber':
          example = idExample;
          notFullFill = 10;
          problem = this.errors.idNumber;
          break;
      }
      
      def = example.replace(/\D/g, ""),
      val = e.target.value.replace(/\D/g, "");
  
      if (def.length >= val.length) val = def;
  
      e.target.value = example.replace(/./g, function(a) {
          return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;

      });
      if (e.type == "blur") {
        if (e.target.value.length < notFullFill) {
          e.target.classList.add('form-input-invalid');
          e.target.nextElementSibling.innerText = problem;
          this.validInputs[e.target.id] = false;
        } else{
          this.validInputs[e.target.id] = true;
      }
        this.validInputsCheck();

      } 
    },

    selectChange: function (e) {
      let id = e.target.id;

      if (e.target.value != 'default'){
        this.validInputs[id] = true;
      } else{
        this.validInputs[id] = false;
        this.formBtnDisabled = true;
      }

      this.validInputsCheck();
    },

    // галочка согласия
    checkConditions: function() {
      this.validInputs.inputConditions = !this.validInputs.inputConditions;

      this.validInputsCheck();
    },
  
    // проверка сколько полей заполнено правильно
    // если все поля заполнены - кнопка в форме активна
    validInputsCheck: function() {
      let isValid = 0,
          validInputsLength = Object.keys(this.validInputs);
      
      for (key in this.validInputs){
        if(this.validInputs[key] === true){
          isValid++;
        }
      }
      
      if(isValid == validInputsLength.length ){
        this.formBtnDisabled = false;
      } else{
          this.formBtnDisabled = true;
      }
        
    },


  },

});