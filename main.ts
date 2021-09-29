import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from "./student.js";

import { dataStudents } from './dataStudents.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById("infostudent")!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBox_inferior: HTMLInputElement = <HTMLInputElement> document.getElementById("lim_inferior")!;
const inputSearchBox_superior: HTMLInputElement = <HTMLInputElement> document.getElementById("lim_superior")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();
renderStudent(dataStudents);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudent(students: Student[]): void {
    console.log('Desplegando estudiante');
    students.forEach((student) => {
        let trElementCodigo = document.createElement("tr");
        trElementCodigo.innerHTML = `<td>Código</td>
                                    <td>${student.codigo}</td>`
        let trElementCedula = document.createElement("tr");
        trElementCedula.innerHTML = `<td>Cédula</td>
                                    <td>${student.cedula}</td>`
        let trElementEdad = document.createElement("tr");
        trElementEdad.innerHTML = `<td>Edad</td>
                                    <td>${student.edad}</td>`
        let trElementDireccion = document.createElement("tr");                  
        trElementDireccion.innerHTML =`<td>Dirección</td>
                                        <td>${student.direccion}</td>`
        let trElementTelefono = document.createElement("tr");    
        trElementTelefono.innerHTML =`<td>Teléfono</td>
                                        <td>${student.telefono}</td>`;
        studentTbody.appendChild(trElementCodigo);
        studentTbody.appendChild(trElementCedula);
        studentTbody.appendChild(trElementEdad);
        studentTbody.appendChild(trElementDireccion);
        studentTbody.appendChild(trElementTelefono);
    });
  }



function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function applyFilterByCredits(){
    let text_inferior = inputSearchBox_inferior.value;
    text_inferior = (text_inferior == null) ? '' : text_inferior;
    let text_inferior_n: number = +text_inferior;

    let text_superior = inputSearchBox_superior.value;
    text_superior = (text_superior == null) ? '' : text_superior;
    let text_superior_n: number = +text_superior;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchByNumCredits(text_inferior_n, text_superior_n, dataCourses);
    renderCoursesInTable(coursesFiltered);

}

function searchByNumCredits(lim_inferior: number, lim_superior: number, courses: Course[]){
    let coursesFiltered: Course[] = [];
    if (lim_inferior != 0 && lim_superior != 0)
    {
        for(let course of courses)
        {
            if(course.credits >= lim_inferior && course.credits <= lim_superior)
            {
                coursesFiltered.push(course);
            }
        }
    }
    else
    {
        coursesFiltered = dataCourses;
    }
    return coursesFiltered;
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}
    