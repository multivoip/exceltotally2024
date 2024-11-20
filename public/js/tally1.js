var convert = false;

function proccess()
            {
                jQuery(".abcd").css("display", "block");
            }
			
		function proccesscmp()
            {
                jQuery(".abcd").css("display", "none");
				jQuery("#form1").css("display", "block");
				jQuery("#form2").css("display", "block");
				
            }
            jQuery('.convert').prop("disabled", true);
            var a = 0;
            //binds to onchange event of your input field
            jQuery('#file').bind('change', function () {
				jQuery("#form1").css("display", "none");
				jQuery("#form2").css("display", "none");
				
                jQuery('#invalideerror').slideUp("slow");
                var strin = this.files[0].name;
                var fourchr = strin.substring(0, 4);
                if (fourchr == 'VCHR' || fourchr == 'MLED' || fourchr == 'MITM'|| fourchr == 'HUSK' || fourchr == 'SIBW' || fourchr == 'SALE' || fourchr == 'PURC' || fourchr == 'DXBS' || fourchr == 'DXBV' || fourchr == 'FEES'|| fourchr == 'QHRE') {
					if (fourchr == 'VCHR' || fourchr == 'MLED' || fourchr == 'HUSK' || fourchr == 'SIBW' || fourchr == 'MITM' || fourchr == 'SALE' || fourchr == 'PURC' || fourchr == 'DXBS' || fourchr == 'DXBV' || fourchr == 'FEES'|| fourchr == 'QHRE') {
					convert = true;
					}else {convert = false;}
                    var ext = jQuery('#file').val().split('.').pop().toLowerCase();
                    if (jQuery.inArray(ext, ['xls','xlsx','xlsm']) == -1) {
                        jQuery('#error1').slideDown("slow");
                        jQuery('#error2').slideUp("slow");
                        a = 0;
                    } else {
                        var picsize = (this.files[0].size);
                        if (picsize > 104857600) {
                            jQuery('#error2').slideDown("slow");
                            a = 0;
                        } else {
                            a = 1;
                            jQuery('#error2').slideUp("slow");
                        }
                        jQuery('#error1').slideUp("slow");
                        if (a == 1) {
                            jQuery('.convert').attr('disabled', false);
                        }
                    }
                } else {

                    jQuery('.convert').attr('disabled', true);
                    jQuery('#invalideerror').slideDown("slow");

                    return false;
                }
            });
            function refrash()
            {
                setTimeout(function () {
                    ref();
                }, 3000);
            }
            function ref()
            {
                window.location = "";
            }
            function ref1()
            {
                jQuery(".emailerror").hide();
            }
			
	//reading excel file and send server.............................................
				var myurl = "";
	  jQuery('#file').bind('change', function () {
                jQuery('#invalideerror').slideUp("slow");
                var strin = this.files[0].name;
                var fourchr = strin.substring(0, 4);
                if (fourchr == 'VCHR'){
					myurl = "http://localhost:5500/upload"
					
				} if (fourchr == 'MLED'){
					myurl = "http://localhost:5500/ledger"
					
				} if (fourchr == 'MITM'){
					myurl = "http://localhost:5500/stock"
					
				} if (fourchr == 'FEES'){
					myurl = "http://localhost:5500/fees"
					
				}if (fourchr == 'SALE'){
					myurl = "http://localhost:5500/sales"
					
				}if (fourchr == 'HUSK'){
					myurl = "http://localhost:5500/husk"
					
				}if (fourchr == 'SIBW'){
					myurl = "http://localhost:5500/SalesIBW"
					
				}if (fourchr == 'PURC'){
					myurl = "http://localhost:5500/purchase"
					
				} if (fourchr == 'DXBS'){
					myurl = "http://localhost:5500/salesdxb"
					
				} if (fourchr == 'DXBV'){
					myurl = "http://localhost:5500/dxbrecpay"
					
				} if (fourchr == 'QHRE'){
					myurl = "http://localhost:5500/QHREC"
					
				}
	  });
	
$("#form").submit(function (event) {

        //disable the default form submission
        event.preventDefault();		
		var excelData = [];
		showDataExcel(event);
	function showDataExcel(event) { 
    var file = event.target[0].files[0];
  var reader = new FileReader();
 reader.onload = function (event) {
 var data = event.target.result;
 var workbook = XLSX.read(data, {
 type: 'binary'
 });

 workbook.SheetNames.forEach(function (sheetName) {
	   console.log(sheetName);
	if (sheetName === 'Sheet1') {
     excelData = [];
   var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
     for (var i = 0; i < XL_row_object.length; i++)
     { excelData.push(XL_row_object[i]);
     };
          
      var json_object = JSON.stringify(XL_row_object);
	  
	 if (convert == true){
	  proccess();
	    $.ajax({
            type: "POST",
            url: myurl,
			
		//	 crossDomain: true,
			contentType: 'application/json',
			//headers: { 'Access-Control-Allow-Origin': '*' },
			 data: [json_object],
		//cache: false,
			
		//contentType: 'application/vnd.ms-excel',
		enctype: 'multipart/form-data',
		processData: false,
           
            success: function(data) {
			console.log(data)
			proccesscmp(),
			$("#form1").submit(function clickdownload(){
	
	var pom = document.createElement('a');

	var filename = "file.xml";
	var pom = document.createElement('a');
	var bb = new Blob([data], {type: 'text/plain'});

	pom.setAttribute('href', window.URL.createObjectURL(bb));
	pom.setAttribute('download', filename);

	pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
	pom.draggable = true; 
	pom.classList.add('dragout');
	pom.click();
});




$("#form2").submit(function tallytrsn(){
	
    var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:9000", true);//localhost:9001--is tally server
	//xhr.setRequestHeader('Access-Control-Allow-Origin',' *');
    console.log('ok');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.withCredentials = true;
	xhr.onload = function ()
	{
	//console.log(xhr.responseText);
	};
	xhr.send(data);     
	alert("Tranfser To Tally Succesfully")
});
	
            },
            error: function(jqXHR, textStatus, err) {
                alert('text status '+textStatus+', err '+err)
            }
        });
				
	 }
	 else {alert ('upload voucher file')}
	 };
     });
};

reader.onerror = function (ex) {
console.log(ex);
};

reader.readAsBinaryString(file);
};
		

});