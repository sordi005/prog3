// Simulamos una base de datos más compleja
const database = {
    users: [
        { id: 1, name: "Ana", email: "ana@email.com", departmentId: 1 },
        { id: 2, name: "Luis", email: "luis@email.com", departmentId: 2 },
        { id: 3, name: "María", email: "maria@email.com", departmentId: 1 }
    ],
    departments: [
        { id: 1, name: "Ventas", budget: 50000 },
        { id: 2, name: "IT", budget: 75000 }
    ],
    projects: [
        { id: 1, name: "Proyecto A", departmentId: 1, budget: 20000 },
        { id: 2, name: "Proyecto B", departmentId: 2, budget: 30000 }
    ]
};

// Función callback para obtener usuario
const getUserById = (id, callback) => {
    setTimeout(() => {
        console.log(`🔍 Buscando usuario con ID: ${id}...`);
        const user = database.users.find(u => u.id === id);
        
        if (user) {
            callback(null, user); // null = no hay error
        } else {
            callback(`❌ Usuario con ID ${id} no encontrado`, null);
        }
    }, 1000);
};

// Función callback para obtener departamento
const getDepartmentById = (departmentId, callback) => {
    setTimeout(() => {
        console.log(`🏢 Buscando departamento con ID: ${departmentId}...`);
        const department = database.departments.find(d => d.id === departmentId);
        
        if (department) {
            callback(null, department);
        } else {
            callback(`❌ Departamento con ID ${departmentId} no encontrado`, null);
        }
    }, 800);
};

// Función callback para obtener proyectos del departamento
const getProjectsByDepartment = (departmentId, callback) => {
    setTimeout(() => {
        console.log(`📋 Buscando proyectos del departamento ${departmentId}...`);
        const projects = database.projects.filter(p => p.departmentId === departmentId);
        callback(null, projects);
    }, 600);
};

// ⚠️ PROBLEMA: CALLBACK HELL - Anidación excesiva
console.log("=== EJEMPLO CON CALLBACKS (Callback Hell) ===");
getUserById(1, (error, user) => {
    if (error) {
        console.log(error);
        return;
    }
    
    console.log(`✅ Usuario encontrado: ${user.name}`);
    
    // Obtenemos el departamento del usuario
    getDepartmentById(user.departmentId, (error, department) => {
        if (error) {
            console.log(error);
            return;
        }
        
        console.log(`✅ Departamento: ${department.name}`);
        
        // Obtenemos los proyectos del departamento
        getProjectsByDepartment(department.id, (error, projects) => {
            if (error) {
                console.log(error);
                return;
            }
            
            console.log(`✅ Proyectos encontrados: ${projects.length}`);
            console.log("📊 Resumen completo:");
            console.log(`   Usuario: ${user.name} (${user.email})`);
            console.log(`   Departamento: ${department.name} (Presupuesto: $${department.budget})`);
            console.log(`   Proyectos: ${projects.map(p => p.name).join(', ')}`);
        });
    });
});