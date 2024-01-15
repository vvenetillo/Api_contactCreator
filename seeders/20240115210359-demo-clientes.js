module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Clientes', [
			{
				nome: 'Ana Souza',
				telefone: '21995549441',
				email: 'ana@ana.com',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				nome: 'Marcos Cintra',
				telefone: '21995549442',
				email: 'marcos@marcos.com',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				nome: 'Felipe Cardoso',
				telefone: '21995549443',
				email: 'felipe@felipe.com',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				nome: 'Sandra Gomes',
				telefone: '21995549444',
				email: 'sandra@sandra.com',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				nome: 'Paula Morais',
				telefone: '21995549445',
				email: 'paula@paula.com',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				nome: 'Sergio Lopes',
				telefone: '21995549446',
				email: 'sergio@sergio.com',
				createdAt: new Date(),
				updatedAt: new Date()
			}
	], {})
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Clientes', null, {})
  }
}
