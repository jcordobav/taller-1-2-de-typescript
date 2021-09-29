"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataCourses_js_1 = require("./dataCourses.js");
var dataStudents_js_1 = require("./dataStudents.js");
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById("infostudent");
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderStudent(dataStudents_js_1.dataStudents);
renderCoursesInTable(dataCourses_js_1.dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses_js_1.dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudent(students) {
    console.log('Desplegando estudiante');
    students.forEach(function (student) {
        var trElementCodigo = document.createElement("tr");
        trElementCodigo.innerHTML = "<td>C\u00F3digo</td>\n                                    <td>" + student.codigo + "</td>";
        var trElementCedula = document.createElement("tr");
        trElementCedula.innerHTML = "<td>C\u00E9dula</td>\n                                    <td>" + student.cedula + "</td>";
        var trElementEdad = document.createElement("tr");
        trElementEdad.innerHTML = "<td>Edad</td>\n                                    <td>" + student.edad + "</td>";
        var trElementDireccion = document.createElement("tr");
        trElementDireccion.innerHTML = "<td>Direcci\u00F3n</td>\n                                        <td>" + student.direccion + "</td>";
        var trElementTelefono = document.createElement("tr");
        trElementDireccion.innerHTML = "<td>Tel\u00E9fono</td>\n                                        <td>" + student.telefono + "</td>";
        studentTbody.appendChild(trElementCodigo);
        studentTbody.appendChild(trElementCedula);
        studentTbody.appendChild(trElementEdad);
        studentTbody.appendChild(trElementDireccion);
        studentTbody.appendChild(trElementTelefono);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses_js_1.dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses_js_1.dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
