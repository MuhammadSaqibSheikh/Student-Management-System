
import inquirer from "inquirer";

class student {
    static counter = 10000
    id: number;
    name: string;
    course:string[];
    balance: number;

    constructor (name:string){
    this.id = student.counter++
    this.name= name;
    this.course = []; //initialize a empty arry of courses
    this.balance=1000;
}
//method to enroll a student in a course
enroll_course (course: string){
    this.course.push(course);
}
// method to view a student balance
view_balance (){
    console.log(`balance view for ${this.name} :$ ${this.balance}`);
    
}
//method to pay student fees
pay_fees(amount:number){
    this.balance -= amount;
    console.log(`$ ${amount} Fees paid successfully for ${this.name} `);
    
}
//method  to display student status
show_status(){
    console.log(`ID ${this.id}`);
    console.log(`NAME ${this.name}`);
    console.log(`Courses: ${this.course}`);
    console.log(`Student Balance: ${this.balance}`);

    
    
    
    
}
}
//defining a student manager class to mange student 
class Student_manager{
    students: student[];

    constructor(){
        this.students=[];
    }
    // method to add a new student
    Add_student(name: string){
        let student1 = new student(name)
        this.students.push(student1)
        console.log(`student ${name} Added successfully: student ID: ${student1.id}`);
        
    }
    //method to enroll in a coures

    enroll_student(student_id: number, course: string){

       let student = this.find_student(student_id)
      
       if (student){
        student.enroll_course(course)
        console.log(`${student.name} enroll in ${course} successfully`);
        
       }


    }

    //method to view a student balance 
    view_balance(student_id: number){
        let student = this.find_student(student_id)
        if(student){
            student.view_balance()
        }else {
            console.log("student not found. please enter a correct id number");
            
        }
    }

    //method to pay student fees
    pay_fees(student_id:number,amount:number){
        let student = this.find_student(student_id)
if(student){
    student.pay_fees(amount)
}else {
    console.log("student not found. please enter a correct id number");   
}
    }

    //method show sudent status

    show_student_status(student_id:number,){
        let student = this.find_student(student_id)
        if(student){
            student.show_status()
        }
    }

//method find a student id
    find_student (student_id : number ){
        return this.students.find(std => std.id === student_id)

    }
}
//main function to run the program

async function main(){
    console.log("WELCOME TO SAQIB STUDENT MANAGEMENT SYSTEM");
    console.log("-".repeat(50));
    
let student_manager = new Student_manager();

//while loop keep program running
while(true){
    //asking user to choose an option
    let choice = await inquirer.prompt([{

name : "choice",
type :"list",
message : "Slect the option",
choices:[
    "Add Student",
    "Enroll Student",
    "View Student Balance",
    "Pay To Student Fees",
    "Show Student Status",
    "Exit"
],

    }])

    //Using switch Case to handle use choice
switch(choice.choice){
    case "Add Student":
        let name_Input = await inquirer.prompt([{

            name:"name",
            type:"input",
            message:"Enter a student Name",
    
         }])
          student_manager.Add_student(name_Input.name);
         break
    
    
    case "Enroll Student":
        let course_input = await inquirer.prompt([{

            name:"student_ID",
            type: "number",
            message:"Enter a student ID",

        },
        {
            name:"course_name",
            type:"input",
            message:"Enter a course Name",
        }

      ])
      student_manager.enroll_student(course_input.student_ID, course_input.course_name)
      break
    case "View Student Balance":
        let balance_Check = await inquirer.prompt([
            {
                name :"Student",
                type: "number",
                message: "Enter the Student ID",

            }
        ])
        student_manager.view_balance(balance_Check.Student)
        break
    case "Pay To Student Fees":
        let pay_Fees = await inquirer.prompt([
            {
                name:"student_id",
                type: "number",
                message: "Enter your Student ID",

            },
            {
                name : "amount",
                type: "number",
                message:"Enter your amount to pay "
            }
        ])
        student_manager.pay_fees(pay_Fees.student_id, pay_Fees.amount);
        break
    case "Show Student Status":
        let Show_std_status = await inquirer.prompt([
            {
                name:"student_id",
                type : "number",
                message:"Enter your Student ID",
            }
        ])
        student_manager.show_student_status(Show_std_status.student_id);
        break
    case "Exit":
        console.log("Exiting...");
        process.exit();
        




}  

}
    
}
main();