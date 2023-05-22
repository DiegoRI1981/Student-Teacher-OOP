const form = document.querySelector('#form')
const cardStudents = document.querySelector('#cardStudents')
const cardTeachers = document.querySelector('#cardTeachers')
const templateStudent = document.querySelector('#templateStudent').content
const templateTeacher = document.querySelector('#templateTeacher').content

const students = []
const teachers = []

document.addEventListener('click', (e) => {
    if (e.target.dataset.name) {
        if (e.target.matches('.btn-success')) {
            students.map((item) => {
                if (item.name === e.target.dataset.name) {
                    item.setState = true
                }
                console.log(item)
                return item
            })
        }
        if (e.target.matches('.btn-danger')) {
            students.map((item) => {
                if (item.name === e.target.dataset.name) {
                    item.setState = false
                }
                console.log(item)
                return item
            })
        }
        Person.drawPersonUI(students, 'student')
    }
})

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    static drawPersonUI(persons, type) {
        if (type === 'student') {
            cardStudents.textContent = ''
            const fragment = document.createDocumentFragment()
            persons.forEach((item) => {
                fragment.appendChild(item.addNewStudent())
            })

            cardStudents.appendChild(fragment)
        }
        else if (type === 'teacher') {
            cardTeachers.textContent = ''
            const fragment = document.createDocumentFragment()
            persons.forEach((item) => {
                fragment.appendChild(item.addNewTeacher())
            })
            cardTeachers.appendChild(fragment)
        }
    }
}

class Student extends Person {
    #state = false
    #student = "student"

    set setState(state) {
        this.#state = state
    }
    get getStudent() {
        return this.#student
    }
    addNewStudent() {
        const clone = templateStudent.cloneNode(true)
        clone.querySelector('h5 .text-primary').textContent = this.name
        clone.querySelector('h6').textContent = this.getStudent
        clone.querySelector('p.lead').textContent = this.age

        if (this.#state) {
            clone.querySelector('.badge').className = 'badge bg-success'
            clone.querySelector('.btn-success').disabled = true
            clone.querySelector('.btn-danger').disabled = false
        }
        else {
            clone.querySelector('.badge').className = 'badge bg-danger'
            clone.querySelector('.btn-danger').disabled = true
            clone.querySelector('.btn-success').disabled = false
        }
        clone.querySelector('.badge').textContent = this.#state ? 'Aproved' : 'Failed'

        clone.querySelector('.btn-success').dataset.name = this.name
        clone.querySelector('.btn-danger').dataset.name = this.name

        return clone

    }
}

class Teacher extends Person {
    #teacher = "Teacher"

    addNewTeacher() {
        const clone = templateTeacher.cloneNode(true)
        clone.querySelector('h5').textContent = this.name
        clone.querySelector('h6').textContent = this.#teacher
        clone.querySelector('p.lead').textContent = this.age
        return clone
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = new FormData(form)
    const [name, age, option] = [...data.values()]

    if (option === "student") {
        const student = new Student(name, age)
        students.push(student)
        Person.drawPersonUI(students, option)
    }
    else if (option === 'teacher') {
        const teacher = new Teacher(name, age)
        teachers.push(teacher)
        Person.drawPersonUI(teachers, option)
    }
})



