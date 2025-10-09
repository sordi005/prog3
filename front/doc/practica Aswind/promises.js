// Convertimos las funciones callback a Promises
const getUserByIdPromise = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`🔍 Buscando usuario con ID: ${id}...`);
            const user = database.users.find(u => u.id === id);
            
            if (user) {
                resolve(user); // Operación exitosa
            } else {
                reject(new Error(`❌ Usuario con ID ${id} no encontrado`)); // Error
            }
        }, 1000);
    });
};

const getDepartmentByIdPromise = (departmentId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`🏢 Buscando departamento con ID: ${departmentId}...`);
            const department = database.departments.find(d => d.id === departmentId);
            
            if (department) {
                resolve(department);
            } else {
                reject(new Error(`❌ Departamento con ID ${departmentId} no encontrado`));
            }
        }, 800);
    });
};

const getProjectsByDepartmentPromise = (departmentId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`📋 Buscando proyectos del departamento ${departmentId}...`);
            const projects = database.projects.filter(p => p.departmentId === departmentId);
            resolve(projects); // Siempre resuelve, aunque sea array vacío
        }, 600);
    });
};

// ✅ SOLUCIÓN MEJORADA: Promise Chaining
console.log("\n=== EJEMPLO CON PROMISES (Promise Chaining) ===");

let userData = {};

getUserByIdPromise(1)
    .then(user => {
        console.log(`✅ Usuario encontrado: ${user.name}`);
        userData.user = user;
        return getDepartmentByIdPromise(user.departmentId);
    })
    .then(department => {
        console.log(`✅ Departamento: ${department.name}`);
        userData.department = department;
        return getProjectsByDepartmentPromise(department.id);
    })
    .then(projects => {
        console.log(`✅ Proyectos encontrados: ${projects.length}`);
        userData.projects = projects;
        
        // Mostramos el resumen completo
        console.log("📊 Resumen completo:");
        console.log(`   Usuario: ${userData.user.name} (${userData.user.email})`);
        console.log(`   Departamento: ${userData.department.name} (Presupuesto: $${userData.department.budget})`);
        console.log(`   Proyectos: ${userData.projects.map(p => p.name).join(', ')}`);
    })
    .catch(error => {
        console.log(`💥 Error en la cadena: ${error.message}`);
    });

// 🚀 PROMISES AVANZADAS: Promise.all para operaciones paralelas
console.log("\n=== PROMISE.ALL - Operaciones Paralelas ===");

const getAllUsersData = () => {
    const userPromises = database.users.map(user => {
        return getUserByIdPromise(user.id)
            .then(userData => getDepartmentByIdPromise(userData.departmentId)
                .then(department => ({
                    user: userData,
                    department: department
                }))
            );
    });
    
    return Promise.all(userPromises);
};

getAllUsersData()
    .then(results => {
        console.log("🎯 Todos los usuarios y sus departamentos:");
        results.forEach(result => {
            console.log(`   ${result.user.name} trabaja en ${result.department.name}`);
        });
    })
    .catch(error => {
        console.log(`💥 Error obteniendo todos los datos: ${error.message}`);
    });