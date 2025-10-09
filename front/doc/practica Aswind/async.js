// 🌟 ASYNC/AWAIT: La sintaxis más limpia y moderna
class UserService {
    
    // Función principal que obtiene todos los datos de un usuario
    static async getUserCompleteInfo(userId) {
        try {
            console.log(`\n🚀 Iniciando búsqueda completa para usuario ${userId}...`);
            
            // Obtenemos el usuario
            const user = await getUserByIdPromise(userId);
            console.log(`✅ Usuario obtenido: ${user.name}`);
            
            // Obtenemos el departamento
            const department = await getDepartmentByIdPromise(user.departmentId);
            console.log(`✅ Departamento obtenido: ${department.name}`);
            
            // Obtenemos los proyectos
            const projects = await getProjectsByDepartmentPromise(department.id);
            console.log(`✅ Proyectos obtenidos: ${projects.length}`);
            
            // Calculamos estadísticas adicionales
            const stats = await this.calculateUserStats(user, department, projects);
            
            return {
                user,
                department,
                projects,
                stats
            };
            
        } catch (error) {
            console.log(`💥 Error obteniendo información completa: ${error.message}`);
            throw error; // Re-lanzamos el error para que lo maneje quien llame la función
        }
    }
    
    // Función auxiliar para calcular estadísticas
    static async calculateUserStats(user, department, projects) {
        // Simulamos un cálculo complejo que toma tiempo
        return new Promise((resolve) => {
            setTimeout(() => {
                const totalProjectBudget = projects.reduce((sum, project) => sum + project.budget, 0);
                const departmentUtilization = (totalProjectBudget / department.budget) * 100;
                
                resolve({
                    totalProjects: projects.length,
                    totalProjectBudget,
                    departmentBudget: department.budget,
                    budgetUtilization: departmentUtilization.toFixed(2) + '%',
                    userRole: departmentUtilization > 50 ? 'Senior' : 'Junior'
                });
            }, 500);
        });
    }
    
    // Función para obtener múltiples usuarios en paralelo
    static async getAllUsersCompleteInfo() {
        try {
            console.log("\n🔄 Obteniendo información de todos los usuarios en paralelo...");
            
            // Creamos un array de promesas para todos los usuarios
            const userPromises = database.users.map(user => 
                this.getUserCompleteInfo(user.id)
            );
            
            // Esperamos que todas las promesas se resuelvan
            const allUsersInfo = await Promise.all(userPromises);
            
            console.log("🎯 Información de todos los usuarios obtenida exitosamente!");
            return allUsersInfo;
            
        } catch (error) {
            console.log(`💥 Error obteniendo información de todos los usuarios: ${error.message}`);
            throw error;
        }
    }
    
    // Función con manejo avanzado de errores
    static async getUserWithFallback(primaryId, fallbackId) {
        try {
            console.log(`\n🎯 Intentando obtener usuario ${primaryId}...`);
            return await this.getUserCompleteInfo(primaryId);
            
        } catch (primaryError) {
            console.log(`⚠️ Usuario ${primaryId} no disponible, intentando con ${fallbackId}...`);
            
            try {
                return await this.getUserCompleteInfo(fallbackId);
            } catch (fallbackError) {
                console.log(`💥 Ambos usuarios fallan: ${primaryError.message} y ${fallbackError.message}`);
                throw new Error("No se pudo obtener información de ningún usuario");
            }
        }
    }
}

// 🧪 EJEMPLOS DE USO

// Ejemplo 1: Usuario individual
console.log("=== ASYNC/AWAIT - Usuario Individual ===");
(async () => {
    try {
        const userInfo = await UserService.getUserCompleteInfo(1);
        console.log("\n📊 RESUMEN COMPLETO:");
        console.log(`👤 Usuario: ${userInfo.user.name} (${userInfo.user.email})`);
        console.log(`🏢 Departamento: ${userInfo.department.name}`);
        console.log(`💰 Presupuesto Departamento: $${userInfo.department.budget}`);
        console.log(`📋 Proyectos: ${userInfo.projects.map(p => p.name).join(', ')}`);
        console.log(`📈 Estadísticas:`);
        console.log(`   - Total Proyectos: ${userInfo.stats.totalProjects}`);
        console.log(`   - Presupuesto Proyectos: $${userInfo.stats.totalProjectBudget}`);
        console.log(`   - Utilización Presupuesto: ${userInfo.stats.budgetUtilization}`);
        console.log(`   - Rol Estimado: ${userInfo.stats.userRole}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
})();

// Ejemplo 2: Todos los usuarios en paralelo
setTimeout(async () => {
    console.log("\n=== ASYNC/AWAIT - Todos los Usuarios ===");
    try {
        const allUsers = await UserService.getAllUsersCompleteInfo();
        
        console.log("\n📋 RESUMEN DE TODOS LOS USUARIOS:");
        allUsers.forEach(userInfo => {
            console.log(`${userInfo.user.name}: ${userInfo.stats.totalProjects} proyectos, rol ${userInfo.stats.userRole}`);
        });
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}, 8000);

// Ejemplo 3: Manejo de errores con fallback
setTimeout(async () => {
    console.log("\n=== ASYNC/AWAIT - Manejo de Errores con Fallback ===");
    try {
        // Intentamos con un ID que no existe, pero tenemos un fallback
        const userInfo = await UserService.getUserWithFallback(999, 2);
        console.log(`✅ Usuario fallback obtenido: ${userInfo.user.name}`);
        
    } catch (error) {
        console.log(`Error final: ${error.message}`);
    }
}, 12000);