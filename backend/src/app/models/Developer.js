module.exports = (sequelize, DataTypes) => {
    const Developer = sequelize.define("Developer", {
        name: DataTypes.STRING,
        sexo: DataTypes.STRING,
        idade: DataTypes.INTEGER,
        hobby: DataTypes.STRING,
        datanascimento: DataTypes.DATEONLY
    })
    
    return Developer
}
