// document.body.innerHTML = "JS is working";


//------------------All functions-----------------

function removePreloader() {
    window.addEventListener('load', () => {
        $('#preloader').remove();
    });
}
removePreloader();


function getAllUsers(){
    let loading = `<tr><td>Loading...</td><td>Loading...</td><td class="hide650">Loading...</td><td class="hide1200">Loading...</td><td class="hide950">Loading...</td><td class="hide950">Loading...</td></tr>`
    $('#mainTable').html(loading); 
    $.ajax({
        type: 'POST',
        url: "./php/getAll.php",
        data: {},
        dataType: 'json',
        success: function (results) {
            // console.log(results);
            let data = results['data'];   
            let table = [];
            for (let i = 0; i < data.length; i++){
                table += `<tr data-id="${data[i].id}" class="table-row-personnel"><td>${data[i].lastName}</td><td>${data[i].firstName}</td><td class="hide650">${data[i].email}</td><td class="hide1200">${data[i].jobTitle}</td><td class="hide950">${data[i].department}</td><td class="hide950">${data[i].location}</td></tr>`;
            }
            $('#mainTable').html(table); 

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
};


getAllUsers();


function departmentTable() {
    $.ajax({
        type: 'POST',
        url: './php/getDepartmentInfo.php',
        data: {},
        dataType: 'json',
    success: function(results) {
        // console.log(results); 
        let data = results['data'];   
        let table = [];
        for (let i = 0; i < data.length; i++){
            let employee = data[i].users;
            if (employee === '0') {
                employee = 'NONE'
            }
            table += `<tr data-id="${data[i].deptId}" class="table-row-department"><td>${data[i].department}</td><td>${data[i].location}</td><td>${employee}</td></tr>`;
        }
        $('#mainTableDepartment').html(table); 
    },
    error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
 })
}


function locationTable() {
        $.ajax({
            type: 'POST',
            url: './php/getLocationInfo.php',
            data: {},
            dataType: 'json',
        success: function(results) {
            // console.log(results); 
            let data = results['data'];
            let table = [];
            for (let i = 0; i < data.length; i++){
                let dept = data[i].department;
                let employee = data[i].employees;
                if (dept === null) {
                    dept = 'NONE'
                }
                if (employee === '0') {
                    employee = 'NONE'
                }
                table += `<tr data-id="${data[i].locationID}" class="table-row-location"><td>${data[i].location}</td><td>${dept}</td><td>${employee}</td></tr>`;
            }

            $('#mainTableLocation').html(table); 
        },
        error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
     })
}


function showAll() {
    $('.personnelTable').removeClass('hide');
    $('.departmentTable').addClass('hide');
    $('.locationTable').addClass('hide');
    $('#showAllEmployee').addClass('hide');
    $('.addEmployee').removeClass('hide');
    $('#showAllDepartments').removeClass('hide');
    $('#showEditDeptModal').addClass('hide');
    $('#showEditLocModal').addClass('hide');
    $('#showAllLocations').removeClass('hide');

    getAllUsers();
    // $('#selectDepartment').text('Departament').change();
    $('.selectLocation option').prop('selected', function () {
        return this.defaultSelected;
    });
    $('.selectDepartment option').prop('selected', function () {
        return this.defaultSelected;
    });
    $('#searchFor').val('');
}


function getDepartment() {
    $.ajax({
        type: 'POST',
        url: "./php/getAllDepartments.php",
        data: {},
        dataType: 'json',
        success: function(results) {
            // console.log(results);
            let data = results['data']; 
            let addDeptToSelect = [];
            let addDeptToSelect2 = [];
            addDeptToSelect += '<option value="Select" selected>Department</option>'
            for (let i = 0; i < data.length; i++){
                addDeptToSelect += `<option value="${data[i]['id']}"> ${data[i]['name']}</option>`
            }
            for (let i = 0; i < data.length; i++){
                addDeptToSelect2 += `<option value="${data[i]['id']}"> ${data[i]['name']}</option>`
            }
            $('.selectDepartment').html(addDeptToSelect);
            $('#departments').html(addDeptToSelect);
            $('#departmentToDelete').html(addDeptToSelect);
            $('#addEmployeeDepartment').html(addDeptToSelect2);
            $('#departmentInfo').html(addDeptToSelect2);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
};


getDepartment();


function getLocation() {
    $.ajax({
        type: 'POST',
        url: "./php/getAllLocation.php",
        data: {},
        dataType: 'json',
        success: function(results) {
            // console.log(results);
            let data = results['data']; 
            let addLocationToSelect = [];
            let addLocationToSelect2 = [];
            addLocationToSelect += '<option value="Select" selected>Location</option>'
            for (let i = 0; i < data.length; i++){
                addLocationToSelect += `<option value="${data[i]['id']}"> ${data[i]['name']}</option>`
            }
            for (let i = 0; i < data.length; i++){
                addLocationToSelect2 += `<option value="${data[i]['id']}"> ${data[i]['name']}</option>`
            }
            $('.selectLocation').html(addLocationToSelect);
            $('#locationToDelete').html(addLocationToSelect);
            $('#locationToEdit').html(addLocationToSelect);
            $('#localizationOfDepartment').html(addLocationToSelect2);
            $('#selectLocationForEditedDepartment').html(addLocationToSelect);
            $('#addEmployeeLocation').html(addLocationToSelect2);
            $('#addDepartmentLocation').html(addLocationToSelect2);
            $('#locationInfo').html(addLocationToSelect2);
            $('#deptModalLoc').html(addLocationToSelect2);
            

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}


getLocation();


function getEmployeeByDept(chosenDepartment) {
    $.ajax({
        type: 'POST',
        url: './php/getPersonelByDept.php',
        data: {id : chosenDepartment},
        dataType: 'json',
        success: function (results) {
        // console.log(results);
        let data = results['data']; 
        let table = [];
        for (let i = 0; i < data.length; i++){
            table += `<tr data-id="${data[i].id}" class="table-row-personnel"><td>${data[i].lastName}</td><td>${data[i].firstName}</td><td class="hide650">${data[i].email}</td><td class="hide1200">${data[i].jobTitle}</td><td class="hide950">${data[i].department}</td><td class="hide950">${data[i].location}</td></tr>`;
        }
        $('#mainTable').html(table); 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}


function getEmployeeByLocation(chosenLocation) {
    $.ajax({
        type: 'POST',
        url: './php/getPersonelByLocation.php',
        data: {id : chosenLocation},
        dataType: 'json',
        success: function (results) {
        // console.log(results);
        let data = results['data']; 
        let table = [];
        for (let i = 0; i < data.length; i++){
            table += `<tr data-id="${data[i].id}" class="table-row-personnel"><td>${data[i].lastName}</td><td>${data[i].firstName}</td><td class="hide650">${data[i].email}</td><td class="hide1200">${data[i].jobTitle}</td><td class="hide950">${data[i].department}</td><td class="hide950">${data[i].location}</td></tr>`;
        }
        $('#mainTable').html(table); 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}


function getEmployeeInfo(employeeId) {
    $.ajax({
    type: 'POST',
    url: './php/getPersonelById.php',
    data: {id : employeeId},
    dataType: 'json',
    success: function(results) {
        // console.log(results);
        let firstName = results['data']['personnel'][0]['firstName'];
        let lastName = results['data']['personnel'][0]['lastName'];
        let id = results['data']['personnel'][0]['id'];
        let email = results['data']['personnel'][0]['email'];
        let jobTitle = results['data']['personnel'][0]['jobTitle'];
        let department = results['data']['personnel'][0]['departmentID'];
        let locationID = results['data']['personnel'][0]['locationID'];
        let fullName = '';
        fullName += firstName + " ";
        fullName += lastName;
        
        $('#employeeInfoLabel').html(fullName);
        $('#employeeIdInfo').val(id);
        $('#firstNameInfo').attr('userId', id);
        $('#firstNameInfo').val(firstName);
        $('#lastNameInfo').val(lastName);
        $('#emailInfo').val(email);
        $('#jobTitleInfo').val(jobTitle);
        $('#departmentInfo').val(department);
        $('#locationInfo').val(locationID);
        
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
})
}


function addNewEmployee(firstName, lastName, email, job, department) {
    $.ajax({
        type: 'POST',
        url: './php/createEmployee.php',
        data: {
            firstName : firstName,
            lastName : lastName,
            email : email,
            job : job,
            department : department
        },
        dataType: 'json',
    success: function() {
        Swal.fire(
            'Created!',
            'You have successfully added new employee.',
            'success'
            ).then(function() {
                getAllUsers();
                $('.modal').modal('hide');
              });
       
    },
    error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}


function editEmployee(employeeId, firstName, lastName, email, job, deptartmentId) {
    $.ajax({
        type: 'POST',
        url: './php/updateEmployee.php',
        data: {
            id: employeeId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            job: job,
            deptartmentId : deptartmentId
        },
        dataType: 'json',
    success: function() {
        Swal.fire(
            'Changed!',
            'Your file has been changed.',
            'success'
            ).then(function() {
                getAllUsers();
                $('.modal').modal('hide');
              });   
    },
    error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}


function deleteEmployeeById(employeeId) {
    $.ajax({
        type: 'POST',
        url: './php/deleteEmployeeById.php',
        data: {id : employeeId},
    dataType: 'json',
    success: function () {   
        Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
              ).then(function() {
                  getAllUsers();
                  $('.modal').modal('hide');
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
})
}


function addLocation(locationToAdd) {
    $.ajax({
        type: 'POST',
        url: './php/createLocation.php',
        data: {location : locationToAdd},
        dataType: 'json',
        success: function() {
            Swal.fire(
                'Created!',
                `You have successfully added ${locationToAdd} to the location base.`,
                'success'
                ).then(function() {
                    // getAllUsers();
                    locationTable();
                    getLocation();
                    $('.modal').modal('hide');
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
}


function saveEditedLocation(valueLocation, editedLocation, location2) {
    // console.log(valueLocation);
    // console.log(editedLocation);
    $.ajax({
        type: 'POST',
        url: './php/updateLocation.php',
        data: {
            id: valueLocation,
            name: editedLocation
        },
        dataType: 'json',
        success: function (res) {
        console.log(res);
        Swal.fire(
            'Changed!',
            '',
            'success'
            ).then(function() {
                getLocation();
                // getAllUsers();
                locationTable();
                $('.modal').modal('hide');
            });
       
    },
    error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
    

function deleteLocation(locationToDelete) {
    $.ajax({
        type: 'POST',
        url: './php/deleteLocation.php',
        data: {location : locationToDelete},
        dataType: 'json',
        success: function (results) {
        // console.log(results);
        Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
            ).then(function() {
                getLocation();
                // getAllUsers();
                locationTable();
                $('.modal').modal('hide');
              });
       
    },
    error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function canIdeleteLocation(locationToDelete) {
    $.ajax({
        type: 'POST',
        url: './php/canIdeleteLocation.php',
        data: {id : locationToDelete},
        dataType: 'json',
    success: function(results) {
        console.log(results);
        let deptsAmount = results.data.location[0]['departments'];
        let location = results.data.location[0]['location'];
        // console.log(deptsAmount);
        if (deptsAmount > 0) {
            Swal.fire({
                title: '',
                text: `You cannot delete ${location} because it has ${deptsAmount} department(s).`,
                icon: 'warning',
            })
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: `You are about to delete ${location}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#bb2d3b',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //   console.log('deleted');
            deleteLocation(locationToDelete);
            }
        })
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}


function addDepartment(deptartpentToAdd, locationIdOfDepartment) {
    $.ajax({
        type: 'POST',
        url: './php/createDepartment.php',
        data: {
            name : deptartpentToAdd,
            id : locationIdOfDepartment
        },
        dataType: 'json',
    success: function() {
        Swal.fire(
            'Created!',
            `You have succesfully added ${deptartpentToAdd} to the department base.`,
            'success'
            ).then(function() {
                getDepartment();
                // getAllUsers();
                departmentTable();
                $('.modal').modal('hide');
            });
    },
    error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}


function editDepartment(updatedDepartment, locationIdOfDepartment, depatmentId,) {
    $.ajax({
        type: 'POST',
        url: './php/updateDepartment.php',
        data: {
            name: updatedDepartment,
            locationId: locationIdOfDepartment,
            departmentId : depatmentId
        },
        dataType: 'json',
    success: function() {
        Swal.fire(
            'Changed!',
            ``,
            'success'
            ).then(function() {
                getDepartment();
                // getAllUsers();
                $('.modal').modal('hide');
                departmentTable();
              });
    },
    error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}


function canIdeleteDepartment(idDepartmentToDelete) {
    $.ajax({
        type: 'POST',
        url: './php/canIdeleteDepartment.php',
        data: {
            id : idDepartmentToDelete
        },
        dataType: 'json',
    success: function(results) {
        console.log(results);
        let eployeeAmount = results.data[0]['employees'];
        let departmentName = results.data[0]['department']
        let departmentId = results.data[0]['deptID']
        console.log(eployeeAmount);
        console.log(departmentName);
        console.log(departmentId);
        if (eployeeAmount > 0) {
            Swal.fire({
                title: '',
                text: `You cannot delete department ${departmentName} because it has ${eployeeAmount} employee(s).`,
                icon: 'warning',
            })
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: `You are about to delete department ${departmentName}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#bb2d3b',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //   console.log('deleted');
                deleteDepartment(departmentId);
            }
        })
        }        
    },
    error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}


function deleteDepartment(departmentId) {
    $.ajax({
        type: 'POST',
        url: './php/deleteDepartment.php',
        data: {id : departmentId},
        dataType: 'json',
        success: function () {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                ).then(function() {
                    getDepartment();
                    getAllUsers();
                    departmentTable();
                    $('.modal').modal('hide');
                  });
    },
    error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}


function checkLocationForDept(depatmentId) {
    $.ajax({
        type: 'POST',
        url: './php/getLocationByDepartmentId.php',
        data: {id : depatmentId},
        dataType: 'json',
        success: function (results) {
        // console.log(results);
        let locationId = results.data[0]['locationid'];
        $('#selectLocationForEditedDepartment').val(locationId);
        $('#addEmployeeLocation').val(locationId);
        $('#locationInfo').val(locationId);
    },
    error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}


function searchName(search) {
 
    $.ajax({
        type: 'POST',
        url: './php/search.php',
        data: { search: search },
        dataType: 'json',
        success: function (results) {
            console.log(results);
            let data = results['data'];
            let table = [];
            for (let i = 0; i < data.length; i++){
                table += `<tr data-id="${data[i].id}" class="table-row-personnel"><td>${data[i].lastName}</td><td>${data[i].firstName}</td><td class="hide650">${data[i].email}</td><td class="hide1200">${data[i].jobTitle}</td><td class="hide950">${data[i].department}</td><td class="hide950">${data[i].location}</td></tr>`;
            }
            if (results.data.length !== 0) {
                $('#mainTable').html(table);
                $('#mainTableLocation').html(table);
                $('#mainTableDepartment').html(table);
            } else {
                let noData = `<tr><td>No data</td><td>No data</td><td class="hide650">No data</td><td class="hide1200">No data</td><td class="hide950">No data</td><td class="hide950">No data</td></tr>`
                $('#mainTable').html(noData); 
                Swal.fire(
                    '',
                    'The phrase you are looking for was not found.',
                    'info'
                )
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
        
    


//------------------ Buttons -------------------
  
    
$(document).on('click', '.table-row-personnel', function () {
    let employeeId = $(this).data("id");
    $('#employeeInfo').modal('show');
    getEmployeeInfo(employeeId);
});


$(document).on('click', '.table-row-location', function () {
    let locationId = $(this).data("id");
    // console.log(locationId);
    $('#locModalLocId').val(locationId);
    $('#manageLocationsModal').modal('show');
    // $('#locationToAdd').focus();
    getLocationById(locationId)
});


$(document).on('click', '.table-row-department', function () {
    let deptId = $(this).data("id");
    // console.log(deptId);
    $('#deptModalDeptId').val(deptId);
    // console.log('klik row dept');
    $('#manageDepartmentsModal').modal('show');
    // $('#locationToAdd').focus();
    getDepartmentById(deptId)
});


function getDepartmentById(id) {
    $.ajax({
        type: 'POST',
        url: './php/getDepartmentById.php',
        data: { id: id },
        dataType: 'json',
        success: function (results) {
            // console.log(results); 
            // console.log(results.data.personnel['0'].users);
            if (results.data.personnel['0'].users == 0) {
                results.data.personnel['0'].users = 'NONE'
            }
            // if (results.data.personnel['0'].department == 0) {
            //     results.data.personnel['0'].department = 'NONE'
            // }
            $('#deptModalLoc').val(results.data.personnel['0'].locationID)
            $('#deptModalDept').val(results.data.personnel['0'].department)
            $('#deptModalEmployees').val(results.data.personnel['0'].users)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}


function getLocationById(id) {
    $.ajax({
        type: 'POST',
        url: './php/getLocationById.php',
        data: { id: id },
        dataType: 'json',
        success: function (results) {
            // console.log(results);
            if (results.data.personnel['0'].department === null) {
                results.data.personnel['0'].department = 'NONE'
            }
            if (results.data.personnel['0'].employees == 0) {
                results.data.personnel['0'].employees = 'NONE'
            }
            $('#locModalLoc').val(results.data.personnel['0'].location)
            $('#locModalDept').val(results.data.personnel['0'].department)
            $('#locModalEmployees').val(results.data.personnel['0'].employees)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

$('.modal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
    $('#saveLocation').addClass('hide');
    $('#cancelLocation').addClass('hide');
    $('#editLocation').removeClass('hide');
    $('#locationToEdit').removeClass('hide');
    $('#editingLocation').addClass('hide');
    $('#editingDepartment').addClass('hide');
    $('#departments').removeClass('hide');
    $('#editDepartment').removeClass('hide');
    $('#saveEditedDepartment').addClass('hide');
    $('#departmentCancel').addClass('hide');
    $('#saveEmployee').addClass('hide');
    $('#cancelEmployee').addClass('hide');
    $('#deleteEmployee').removeClass('hide');
    $('#editEmployee').removeClass('hide');
    $('#addNewEmployee').removeClass('hide');
    $('#firstNameInfo').attr('disabled', true);
    $('#lastNameInfo').attr('disabled', true);
    $('#emailInfo').attr('disabled', true);
    $('#jobTitleInfo').attr('disabled', true);
    $('#departmentInfo').attr('disabled', true);
    $('#locModalLoc').attr('disabled', true);
    $('#selectLocationForEditedDepartment').attr('disabled', true);
    $('#deleteLocation').removeClass('hide');
    $('#deptModalDept').attr('disabled', true);
    $('#deptModalLoc').attr('disabled', true);
    $('#deleteDepartment').removeClass('hide');
    $('#saveDepartment').addClass('hide');

})


$('#searchButton').on('click', function () {
    $('.personnelTable').removeClass('hide');
        let loading = `<tr><td>Loading...</td><td>Loading...</td><td class="hide650">Loading...</td><td class="hide1200">Loading...</td><td class="hide950">Loading...</td><td class="hide950">Loading...</td></tr>`
    $('#mainTable').html(loading); 
    $('.departmentTable').addClass('hide');
    $('.locationTable').addClass('hide');

     let search = $('#searchFor').val().trim();
    let anySearch = `%${search}%`
    searchName(anySearch)
    $('#showAllEmployee').removeClass('hide');
    $('#showAllDepartments').removeClass('hide');
    $('#showAllLocations').removeClass('hide');
    $('.addEmployee').addClass('hide');
    $('#showEditDeptModal').addClass('hide');
    $('#showEditLocModal').addClass('hide');

})


$('#searchFor').keypress(function(e) {
    var key = e.which;
    if (key == 13)
    {
      $('button[id = searchButton]').click();
      return false;
    }
  });


$('#whatToSearch').on('change', function () {
    $('#searchFor').val('');
})



//------------------Employee buttons---------------


$('.addEmployee').on('click', function () {
    $('#addEmployee').modal('show');
    $('#employeeInfo').modal('hide');
    $('#addEmployeeDepartment').val();
    checkLocationForDept($('#addEmployeeDepartment').val())
// console.log($('#addEmployeeDepartment').val());
})


$('#addNewEmployee').on('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    let firstName = $('#addFirstName').val().trim();
    let lastName = $('#addLastName').val().trim();
    let email = $('#addEmail').val();
    let job = $('#addJobTitle').val();
    let department = $('#addEmployeeDepartment').val();
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(job);
    console.log(department);
    if (firstName && lastName) {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to add a new employee: ${firstName} ${lastName}.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#167a4b',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, create it!'
    }).then((result) => {
        if (result.isConfirmed) {
            addNewEmployee(firstName, lastName, email, job, department);
        }
    })
    } else {
        Swal.fire(
            '',
            `Please fill up required inputs.`,
            'error'
            )
    }
})


$('#editEmployee').on('click', function (e) {
    e.preventDefault();
    $('#saveEmployee').removeClass('hide');
    $('#cancelEmployee').removeClass('hide');
    $('#deleteEmployee').addClass('hide');
    $('#editEmployee').addClass('hide');
    $('#addNewEmployee').addClass('hide');
    $('#firstNameInfo').attr('disabled', false);
    $('#lastNameInfo').attr('disabled', false);
    $('#emailInfo').attr('disabled', false);
    $('#jobTitleInfo').attr('disabled', false);
    $('#departmentInfo').attr('disabled', false);
})


$('#saveEditedEmployee').on('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    let employeeId = $('#employeeIdInfo').val();
    let firstName = $('#firstNameInfo').val();
    let lastName = $('#lastNameInfo').val();
    let email = $('#emailInfo').val();
    let job = $('#jobTitleInfo').val();
    let deptartmentId = $('#departmentInfo').val();
    // console.log(employeeId);
    // console.log(firstName);
    // console.log(lastName);
    // console.log(email);
    // console.log(job);
    // console.log(deptartmentId);
    Swal.fire({
        title: 'Are you sure?',
        text: `You are about to change data for employee.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#167a4b',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, change it!'
}).then((result) => {
    if (result.isConfirmed) {
        editEmployee(employeeId, firstName, lastName, email, job, deptartmentId)
    }
})
})


$('#deleteEmployee').on('click', function () {
    let employeeToDelete = $('#employeeIdInfo').val();
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#bb2d3b',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!'
}).then((result) => {
    if (result.isConfirmed) {
        //   console.log('deleted');
        deleteEmployeeById(employeeToDelete);
    }
})
})


$('#cancelEmployee').on('click', function (e) {
    e.preventDefault();
    $('#firstNameInfo').attr('disabled', true);
    $('#lastNameInfo').attr('disabled', true);
    $('#emailInfo').attr('disabled', true);
    $('#jobTitleInfo').attr('disabled', true);
    $('#departmentInfo').attr('disabled', true);
    $('#saveEmployee').addClass('hide');
    $('#cancelEmployee').addClass('hide');
    $('#deleteEmployee').removeClass('hide');
    $('#editEmployee').removeClass('hide');
    $('#addNewEmployee').removeClass('hide');
    let id = $('#employeeIdInfo').val();
    getEmployeeInfo(id)
})


$('#showAllEmployee').on('click', function () {
    let loading = `<tr><td>Loading...</td><td>Loading...</td><td class="hide650">Loading...</td><td class="hide1200">Loading...</td><td class="hide950">Loading...</td><td class="hide950">Loading...</td></tr>`
    $('#mainTable').html(loading); 
    showAll();
});

//------------------Departments buttons---------------


$('#addNewDepartment').on('submit', function (e) {
    e.preventDefault();
    let deptartpentToAdd = $('#departmentToAdd').val();
    let LocationOfDepartment = $('#addDepartmentLocation :selected').text().trim();
    let locationIdOfDepartment = $('#addDepartmentLocation :selected').val();
    // console.log(deptartpentToAdd);
    // console.log(LocationOfDepartment);
    // console.log(locationIdOfDepartment);
    if (deptartpentToAdd) {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to add ${deptartpentToAdd} department to  ${LocationOfDepartment} location.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#167a4b',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, create it!'
        }).then((result) => {
            if (result.isConfirmed) {
                addDepartment(deptartpentToAdd, locationIdOfDepartment);
            }
        })
    } else {
        Swal.fire(
            '',
            `What department do you want to add?`,
            'question'
            )
    }
})


$('#editDepartment').on('click', function (e) {
    e.preventDefault();
    $('#deptModalDept').attr('disabled', false);
    $('#deptModalLoc').attr('disabled', false);
    $('#deptModalDept').focus();
    $('#deleteDepartment').addClass('hide');
    $('#editDepartment').addClass('hide');
    $('#saveDepartment').removeClass('hide');   
})


$('#saveEditedDepartment2').on('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    let updatedDepartment = $('#deptModalDept').val();
    let locationIdOfDepartment = $('#deptModalLoc').val();
    let depatmentId = $('#deptModalDeptId').val();
    console.log('updated department' + updatedDepartment);
    console.log('location ID' + locationIdOfDepartment);
    console.log(depatmentId);
    // console.log(depatmentText);
          Swal.fire({
            title: 'Are you sure?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#167a4b',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, save it!'
    }).then((result) => {
        if (result.isConfirmed) {
            editDepartment(updatedDepartment, locationIdOfDepartment, depatmentId);
        }
    })
    
})


$('#deleteDepartment').on('click', function (e) {
    e.preventDefault();
    let idDepartmentToDelete = $('#deptModalDeptId').val();
    console.log(idDepartmentToDelete);
    if (idDepartmentToDelete !== 'Select') {
        canIdeleteDepartment(idDepartmentToDelete)
    }
})




$('#departments').on('change', function () {
    let depatmentId = $('#departments').val();
    // console.log(depatmentId);
    checkLocationForDept(depatmentId)
})

$('#addEmployeeDepartment').on('change', function () {
    let depatmentId = $('#addEmployeeDepartment').val();
    // console.log(depatmentId);
    checkLocationForDept(depatmentId)
})


$('#selectDepartment').on('change', function () {
    $('.addEmployee').addClass('hide');
    $('#showAllEmployee').removeClass('hide');
    let chosenDepartment = $('#selectDepartment').children('option:selected').val();
    // console.log(`I chose department number ${chosenDepartment} `);
    if (chosenDepartment === "Select") {
        getAllUsers();
    } else {
        getEmployeeByDept(chosenDepartment);
        $('.selectLocation option').prop('selected', function () {
            return this.defaultSelected;
        });
    }
})

$('#selectDepartment2').on('change', function () {
    let chosenDepartment = $('#selectDepartment2').children('option:selected').val();
    // console.log(`I chose department number ${chosenDepartment} `);
    if (chosenDepartment === "Select") {
        getAllUsers();
    } else {
        getEmployeeByDept(chosenDepartment);
        $('.selectLocation option').prop('selected', function () {
            return this.defaultSelected;
        });
    }
})


$('#departmentInfo').on('change', function () {
    let depatmentId = $('#departmentInfo').val();
    // console.log(depatmentId);
    checkLocationForDept(depatmentId)
})



$('#showEditDeptModal').on('click', function () {
    $('#addDepartment').modal('show');
})


$('#showAllDepartments').on('click', function () {
    let loading = `<tr><td>Loading...</td><td>Loading...</td><td>Loading...</td></tr>`
    $('#mainTableDepartment').html(loading); 
    $('.personnelTable').addClass('hide');
    $('.departmentTable').removeClass('hide');
    $('#showAllEmployee').removeClass('hide');
    $('.addEmployee').addClass('hide');
    $('#showEditDeptModal').removeClass('hide');
    $('#showAllDepartments').addClass('hide');
    $('#showEditLocModal').addClass('hide');
    $('.locationTable').addClass('hide');
    $('#showAllLocations').removeClass('hide');
    $('.personnelTable').addClass('hide');
    $('#searchFor').val('');
    departmentTable();
})




//------------------Location buttons---------------


$('#addNewLocation').on('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    let locationToAdd = $('#locationToAdd').val().trim();
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to add ${locationToAdd} to the location base.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#167a4b ',
        cancelButtonColor: '#6c757d ',
        confirmButtonText: 'Yes, create it!'
    }).then((result) => {
        if (result.isConfirmed) {
            addLocation(locationToAdd);
        }
    })
    
})


$('#editLocation').on('click', function (e) {
    e.preventDefault();  
    $('#saveLocation').removeClass('hide');
    $('#editLocation').addClass('hide');
    $('#deleteLocation').addClass('hide');
    $('#locModalLoc').attr('disabled', false)
    $('#locModalLoc').focus();
})


$('#saveEditedLocation').on('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    let valueLocation = $('#locModalLocId').val();
    let editedLocation = $('#locModalLoc').val();
    // console.log(location);
    // console.log(valueLocation);
    // console.log(editedLocation);
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to change the location name to ${editedLocation}.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#167a4b',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, change it!'
        }).then((result) => {
            if (result.isConfirmed) {
                saveEditedLocation(valueLocation, editedLocation);
            }
        })
        
});


$('#deleteLocation').on('click', function (e) {
    e.preventDefault()
    let locationToDelete = $('#locModalLocId').val();
    canIdeleteLocation(locationToDelete);
    
})


$('#selectLocation').on('change', function () {
    $('.addEmployee').addClass('hide');
    $('#showAllEmployee').removeClass('hide');
    let chosenLocation = $('#selectLocation').children('option:selected').val();
    // console.log(`I chose location number ${chosenLocation} `);
    if (chosenLocation === 'Select') {
        getAllUsers()
    } else {
        getEmployeeByLocation(chosenLocation);
        $('.selectDepartment option').prop('selected', function () {
            return this.defaultSelected;
        });
    }
})


$('#selectLocation2').on('change', function () {
    let chosenLocation = $('#selectLocation2').children('option:selected').val();
    // console.log(`I chose location number ${chosenLocation} `);
    if (chosenLocation === 'Select') {
        getAllUsers()
    } else {
        getEmployeeByLocation(chosenLocation);
        $('.selectDepartment option').prop('selected', function () {
            return this.defaultSelected;
        });
    }
})


$('#showEditLocModal').on('click', function () {
    $('#addLocation').modal('show');
})


$('#showAllLocations').on('click', function () {
    let loading = `<tr><td>Loading...</td><td>Loading...</td><td>Loading...</td></tr>`
    $('#mainTableLocation').html(loading); 
    $('.personnelTable').addClass('hide');
    $('.departmentTable').addClass('hide');
    $('.locationTable').removeClass('hide');
    $('.addEmployee').addClass('hide');
    $('#showAllLocations').addClass('hide');
    $('#showEditDeptModal').addClass('hide');
    $('#showEditLocModal').removeClass('hide');
    $('#showAllEmployee').removeClass('hide');
    $('#showAllDepartments').removeClass('hide');
    $('.locationTable').removeClass('hide');
    $('#searchFor').val('');
    locationTable();
})

