const Tarea = require("./tarea");


class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            listado.push(this._listado[key]);
        })

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea; 
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        this.listadoArr.forEach( (tarea,id) => {
            const idx = `${id+1}`.green;
            if(tarea.completadoEn !== null){
                console.log(`${idx.green}. ${tarea.desc} :: ${'Completado'.green}`);
            }else{
                console.log(`${idx.green}. ${tarea.desc} :: ${'Pendiente'.red}`);
            }
        })
    }
    
    listadoPendientesCompletadas (completadas = true){
        console.log();

        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                        ? 'Completada'.green
                        : 'Pendiente'.red;
            if(completadas){
                if(completadoEn !== null){
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
                }
            }else{
                if(completadoEn === null){
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
                }
            }
        })
    }

    borrarTarea(id = ''){
        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas (ids = []){
        ids.forEach(id=>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        }); 
        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }

        })
    }
}

module.exports = Tareas