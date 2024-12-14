let userdata = []

const saveData = ()=>{
    let alldata = JSON.parse(localStorage.getItem("userdata"))
    let len = alldata!=null ? alldata.length+1 : 1
    let name = document.getElementById("name").value
    // let age = document.frm.age.value
    let age = $("#age").val()
    let id = $("#id").val()
    let gender = $("input[type='radio']:checked").val()
    if(id == ''){
        //insert
        let obj = {
            id:len,
            name:name,
            age:age,
            gender:gender
        }
        // console.log(obj);
        userdata.push(obj)
   
    } else {
        //update
        let updatedData = alldata.map((i)=>{
            if(i.id == id){
                i.name = name
                i.age = age
                i.gender = gender
            }
            return i
        })
        userdata = updatedData
    }
    localStorage.setItem("userdata",JSON.stringify(userdata))
    document.frm.reset()
    $("#gender1").removeAttr("checked")
    $("#gender2").removeAttr("checked")
    disp()
}
const disp = ()=>{
    //first localstorage mese data ko get karna he
    let alldata = JSON.parse(localStorage.getItem('userdata'))
    //JSON parse means original format me convert kiya
    let txt = ''
    //all data display in table format 
    alldata.map((i)=>{
        txt += `
                <tr>
                    <td>${i.id}</td>
                    <td>${i.name}</td>
                    <td>${i.age}</td>
                    <td>${i.gender}</td>
                    <td>
                        <button onclick="editData(${i.id})">Edit</button>
                        <button onclick="delData(${i.id})">Delete</button>
                    </td>
                </tr>`
    })
    $("#alldata").html(txt)

}
const delData = (id)=>{
    let alldata = JSON.parse(localStorage.getItem('userdata'))
    //5  -- 1   3 4 5
    //id = 2
    let res = alldata.filter((i)=>{
            return i.id != id
    })
    let j=1
    let finaldata = res.map((i)=>{
            i.id = j++
            return i
    })
    localStorage.setItem("userdata",JSON.stringify(finaldata))
    disp()
}
const editData = (id)=>{
    $("#gender1").removeAttr("checked")
    $("#gender2").removeAttr("checked")
    let alldata = JSON.parse(localStorage.getItem('userdata'))   
    let res = alldata.find((i)=>{
            return i.id == id
    })
    $("#age").val(res.age)
    $("#name").val(res.name)
    $("#id").val(res.id)
    let gender = res.gender
    if(gender == "male"){
        $("#gender1").attr("checked","true")
    } else {
        $("#gender2").attr("checked","true")
    }
    //let a = $("input[type='radio']").attr("checked")
    localStorage.setItem("userdata",JSON.stringify(finaldata))
    disp()
}
disp()