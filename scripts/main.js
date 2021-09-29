import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById("infostudent");
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputSearchBox_inferior = document.getElementById("lim_inferior");
var inputSearchBox_superior = document.getElementById("lim_superior");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderStudent(dataStudents);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
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
        trElementTelefono.innerHTML = "<td>Tel\u00E9fono</td>\n                                        <td>" + student.telefono + "</td>";
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
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function applyFilterByCredits() {
    var text_inferior = inputSearchBox_inferior.value;
    text_inferior = (text_inferior == null) ? '' : text_inferior;
    var text_inferior_n = +text_inferior;
    var text_superior = inputSearchBox_superior.value;
    text_superior = (text_superior == null) ? '' : text_superior;
    var text_superior_n = +text_superior;
    clearCoursesInTable();
    var coursesFiltered = searchByNumCredits(text_inferior_n, text_superior_n, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchByNumCredits(lim_inferior, lim_superior, courses) {
    var coursesFiltered = [];
    if (lim_inferior != 0 && lim_superior != 0) {
        for (var _i = 0, courses_1 = courses; _i < courses_1.length; _i++) {
            var course = courses_1[_i];
            if (course.credits >= lim_inferior && course.credits <= lim_superior) {
                coursesFiltered.push(course);
            }
        }
    }
    else {
        coursesFiltered = dataCourses;
    }
    return coursesFiltered;
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
