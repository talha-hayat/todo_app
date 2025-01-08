// const supabaseUrl = 'https://acgcsvexjnmlqnzrgdkq.supabase.co'
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZ2NzdmV4am5tbHFuenJnZGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNzcwNDcsImV4cCI6MjA1MTg1MzA0N30.sckFUHyDcF-i0G6KMSFtJ0wuVJq_lCSqYFuOpJk8wN0"
// const supabaseproject = supabase.createClient(supabaseUrl, supabaseKey)


// const input = document.getElementById("input")
// const button = document.getElementById("button")
// const todoList = document.getElementById("todo-list")

// async function addtodo(){
//     const task = input.value

//     const { error } = await supabaseproject
//   .from('todos')
//   .insert({task})

//   if(!error){
//     alert("msg send")
//   }else{
//     alert("msg not send")
//   }

  
//   input.value =""

// }

// async function loadtodos(){
//     const { data, error } = await supabaseproject.from('todos').select()
//     console.log(data)
//     data.forEach((todo)=> addTodoToUi(todo))
// }


// async function addTodoToUi(todo){
//     var inp_value = input.value

//     const liEle = document.createElement("li")
//     liEle.classList.add("list-item")
//     const span_ele = document.createElement("span")
//     span_ele.innerHTML = todo.task
//     const edit_btn = document.createElement("button")
//     edit_btn.innerHTML = "&#10003"
//     const delete_btn = document.createElement("button")
//     delete_btn.innerHTML = "&#10006"


//     todoList.appendChild(liEle)
//     liEle.appendChild(span_ele)
//     liEle.appendChild(edit_btn)
//     liEle.appendChild(delete_btn)


//     edit_btn.addEventListener("click",()=>{
//         span_ele.classList.add("complete")
//     })

//     async delete_btn.addEventListener("click",()=>{

//       const response = await supabase
//       .from('todos')
//       .delete()
//       .eq("id", 3)
    
//         todoList.removeChild(liEle)
//     })


// }




// loadtodos()



const supabaseUrl = 'https://acgcsvexjnmlqnzrgdkq.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZ2NzdmV4am5tbHFuenJnZGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNzcwNDcsImV4cCI6MjA1MTg1MzA0N30.sckFUHyDcF-i0G6KMSFtJ0wuVJq_lCSqYFuOpJk8wN0"
const supabaseproject = supabase.createClient(supabaseUrl, supabaseKey)


const input = document.getElementById("input")
const button = document.getElementById("button")
const todoList = document.getElementById("todo-list")

async function addtodo(){
    const task = input.value

    const { error } = await supabaseproject
  .from('todos')
  .insert({ task })

  if(!error){
    alert("msg sent successfully!")
  } else {
    alert("Error: msg not sent")
  }

  input.value = ""  // Clear input after sending
}

async function loadtodos(){
    const { data, error } = await supabaseproject.from('todos').select()
    if (error) {
        console.error('Error loading todos:', error)
    } else {
        // console.log(data)
        data.forEach((todo) => addTodoToUi(todo))
    }
}

async function addTodoToUi(todo){
    const liEle = document.createElement("li")
    liEle.classList.add("list-item")
    
    const span_ele = document.createElement("span")
    span_ele.innerHTML = todo.task
    
    const edit_btn = document.createElement("button")
    edit_btn.innerHTML = "&#10003"  // Checkmark icon

    const delete_btn = document.createElement("button")
    delete_btn.innerHTML = "&#10006"  // Cross mark icon

    // Append elements
    todoList.appendChild(liEle)
    liEle.appendChild(span_ele)
    liEle.appendChild(edit_btn)
    liEle.appendChild(delete_btn)

    // Edit button event
    edit_btn.addEventListener("click", () => {
        span_ele.classList.toggle("complete")  // Toggle "complete" class to show completed task
    })

    // Delete button event 
    delete_btn.addEventListener("click", async () => {
        const { error } = await supabaseproject
            .from('todos')
            .delete()
            .eq("id", todo.id)  // Use dynamic task id

        if (!error) {
            todoList.removeChild(liEle)  // Remove the todo item from UI after deleting from database
        } else {
            console.error('Error deleting task:', error)
        }
    })
}

loadtodos()  // Call the function to load todos when page loads


const logout = document.getElementById("logout")

logout.addEventListener("click" , async ()=>{
    const { error } = await supabaseClient.auth.signOut()
     window.location.href = 'login.html'
})

