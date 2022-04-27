const { inquirerMenu, pausar,leerInput, listadoTareasBorrar,confirmar,mostrarListadoCheckList} = require('./helpers/inquirer');
const {guardarDB,leerDB} = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas');

require('colors');


console.clear();


const main = async() =>{
  
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)
    }
   
    do{
        //Imprimir el menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listadoPendientesCompletadas(true);
            break;
            case '4':
                tareas.listadoPendientesCompletadas(false);
            break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                
                if (id !== '0'){
                    const confirmarOk = await confirmar('¿Esta seguro que desea borrar la tarea?');
                    if (confirmarOk){
                        tareas.borrarTarea(id)
                        console.log('Tarea borrada')
                    }
                }
            break;
        }

        guardarDB(tareas.listadoArr);

        
        await pausar();
        
        



    }while(opt !== '0');

}

main();