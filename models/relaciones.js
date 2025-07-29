import Empleado from './Empleado.js';
import Evento from './Evento.js';

Evento.belongsTo(Empleado, { foreignKey: 'id_Empleado', as: 'empleado' });
Empleado.hasMany(Evento, { foreignKey: 'id_Empleado', as: 'eventos' });

export { Evento, Empleado };
