	
	if(window.sessionStorage.length == 0){
		window.sessionStorage.setItem("food", JSON.stringify(["Brašno", "Kačkavalj", "Kečap", "Masline"]))
		window.sessionStorage.setItem("size", JSON.stringify(["1/g", "1/kg", "500/g", "200/g"]))
		window.sessionStorage.setItem("amount", JSON.stringify([1, 5, 10, 3]))
		
		window.sessionStorage.setItem("food1", JSON.stringify(["Brašno", "Kačkavalj"]))
		window.sessionStorage.setItem("size1", JSON.stringify(["1/g", "1/kg"]))
		window.sessionStorage.setItem("amount1", JSON.stringify([3, 2]))			
	}

	
	function openForm(desIng) {
	  document.getElementById("myForm").style.display = "block";
	  document.getElementById("desired_ing").placeholder = desIng;
	  console.log(desIng)
	}
	
	function openForm1(desIng) {
	  document.getElementById("myForm1").style.display = "block";
	  document.getElementById("delivered_ing").placeholder = desIng;
	  console.log(desIng)
	}
	
	
	function order() {
		var desIngSize;
		var desIng = document.getElementById("desired_ing").placeholder;
		var desAmo = document.getElementById("desired_amo").value;
		
		var food = JSON.parse(window.sessionStorage.getItem("food"))
		var size = JSON.parse(window.sessionStorage.getItem("size"))


		var food1 = JSON.parse(window.sessionStorage.getItem("food1"))
		var size1 = JSON.parse(window.sessionStorage.getItem("size1"))
		var amount1 = JSON.parse(window.sessionStorage.getItem("amount1"))
		
		var i;
		
		for(i=0; i<food.length; i++)
			 if(food[i] === desIng)
				 break;
		if (i !== food.length){
			desIngSize = size[i];
		}
		
		food1.push(desIng)
		size1.push(desIngSize)
		amount1.push(parseInt(desAmo))
		
		window.sessionStorage.setItem("food1", JSON.stringify(food1))
		window.sessionStorage.setItem("size1", JSON.stringify(size1))
		window.sessionStorage.setItem("amount1", JSON.stringify(amount1))
		
		document.getElementById("myForm").style.display = "none";
	}
	
	function deliver() {
		debugger;

		var desIng = document.getElementById("delivered_ing").placeholder;
		var desAmo = document.getElementById("delivered_amo").value;
		console.log(desIng);
		console.log(desAmo);
		var food = JSON.parse(window.sessionStorage.getItem("food"))
		var amount = JSON.parse(window.sessionStorage.getItem("amount"))


		var i;
		
		for(i=0; i<food.length; i++)
		{
			 if(food[i] === desIng)
				 amount[i] = amount[i] - desAmo;
			 if(amount[i] < 0 )
				 amount[i] = 0;
		}

		
		window.sessionStorage.setItem("amount", JSON.stringify(amount))
		
		document.getElementById("myForm1").style.display = "none";
		write(0)
	}


	function closeForm() {
	  document.getElementById("myForm").style.display = "none";
	  
	 } 
	 
	function closeForm1() {
	  document.getElementById("myForm1").style.display = "none";
	  
	 } 
	 
	 // pravi tabelu
	 function write(ind){
		 
		var food = JSON.parse(window.sessionStorage.getItem("food"))
		var size = JSON.parse(window.sessionStorage.getItem("size"))
		var amount = JSON.parse(window.sessionStorage.getItem("amount"))

		var food1 = JSON.parse(window.sessionStorage.getItem("food1"))
		var size1 = JSON.parse(window.sessionStorage.getItem("size1"))
		var amount1 = JSON.parse(window.sessionStorage.getItem("amount1"))
		var i;
		var tempFood = (ind === 0) ? food : food1;
		var tempSize = (ind === 0) ? size : size1;
		var tempAmount = (ind === 0) ? amount : amount1;
		var tempId = (ind === 0) ? "id" : "id1";
		console.log("ind")
		console.log(ind)
		var text = '<div class="form-group"><table class="table table-bordered table-light mt-5"> <thead><tr class = "text-center"><th scope="col">Namirnica</th><th scope="col">Količina</th> <th scope="col">Broj pakovanja</th><th> </th></tr>'
		for(i=0;i<tempFood.length;i++){
			console.log(tempFood[i])
			console.log(tempSize[i])
			console.log(tempAmount[i])
			if (tempFood[i] == "None")
				continue;
			if(tempAmount[i] < 4 && ind === 0)
				text += '<tr class = "text-center table-danger">';
			else
				text += '<tr class = "text-center">';
			text += '<td>';
			text += tempFood[i];
			text += '</td>';
			text += '<td>';
			text += tempSize[i];
			text += '</td>';
			text += '<td>';
			text += tempAmount[i].toString();
			text += '</td>';
			//debugger;
			if(ind == 0)
				text += '<td> <a href="#" onclick="openForm(\'' + tempFood[i] + '\')"> Poruči</a>  </td> <td> <a href="#"  onclick="openForm1(\'' + tempFood[i] + '\')" > Isporuči kuhinji</a> </td>'
			else
				text += '<td> <a href="#" onclick="delivered(\'' + tempFood[i] + '\','+tempAmount[i].toString() + ')"> Pristiglo</a> </td>'
			text += '</tr>'
		}
		
		text += '</thead>'
		if (text === null)
			console.log('TEXT NULL')
		if (document.getElementById(tempId) === null)
			console.log('ID NULL')
		
		console.log('\n')
		document.getElementById(tempId).innerHTML = text;
	 }
	 
	 function delivered(foodName, deliveredAmount) {
		var food = JSON.parse(window.sessionStorage.getItem("food", food))
		var amount = JSON.parse(window.sessionStorage.getItem("amount", amount))
		var food1 = JSON.parse(window.sessionStorage.getItem("food1", food1))

		var i;
		
		for(i=0; i<food.length; i++)
			 if(food[i] === foodName)
				 break;
		if (i !== food.length){
			amount[i] += deliveredAmount;
		}
		
		for(i=0; i<food1.length; i++)
			 if(food1[i] === foodName)
				 break;
		if (i !== food1.length){
			food1[i] = "None";
		}
		console.log("delivered")
		for(i=0; i<food1.length; i++){
			console.log(food1[1])
		}
		
		window.sessionStorage.setItem("food", JSON.stringify(food))
		window.sessionStorage.setItem("amount", JSON.stringify(amount))
		window.sessionStorage.setItem("food1", JSON.stringify(food1))


		write(1)	
	}