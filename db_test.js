import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';

const conn = new Sequelize(
 'relay',
 'postgres',
 'postgres', {
 	dialect:'postgres',
 	host:'localhost'
 });

const Person = Conn.define('person', {
	firstName: {
	 type: Sequelize.STRING,
	 allowed: false	
	},
	firstName: {
	 type: Sequelize.STRING,
	 allowed: false	
	},
	email: {
	 type: Sequelize.STRING,
	 allowed: false	,
	 validate: {
	 	isEmail:true
	 }

	}
})


const Post = Conn.define('post', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Person.hasmany(post);
Post.belongsTo(Person);

Conn.sync({force: true}).then(() => {
	_.time(10, () => {
		return Person.create({
			firstName: Faker.name.findName(),
			lastName: Faker.name.findName(),
			email: Faker.internet.email()
		}).then(person => {
			return person.createPost({
				title: `simple post by ${person.firstName}`,
				conten:'hear is some content'
			})
		})
	})
})

export default Conn;