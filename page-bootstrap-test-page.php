<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width = device-width, initial-scale = 1">



<head>
   <!--Set the title of the page that will appear in the tab-->
   <title>Bootstrap!</title>

   <!--Add the bootstrap CSS-->
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">  

   <!--Add jQuery js-->
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

   <!--Add the bootstrap js-->
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</head>



<body>
   <!-- container is relative -->
   <div style="background-color: #d2d2d2; width: 100%; height: 100%; padding:3rem">
      <div style="background-color: lightgreen; width: 100%; height: 100vh; overflow: hidden; position: relative">

         <div style="background-color: lightblue">
            Title bar
         </div>

         <div style="background-color: tomato; overflow: hidden; width: 100%; height: 100%; position: relative">
            <img src="../wp-content/themes/Curbsite/img/fp-3-1.png" alt="" style="width: 100%; position: absolute;">
         </div>

         <div style="background-color: lightpink; bottom: 0; position: absolute; width: 100%">
            Content <br> More content <br> More content...
         </div>

      </div>
   </div>
   
</body>
</html>