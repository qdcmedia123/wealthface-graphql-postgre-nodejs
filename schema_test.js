import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull} from 'graphql';
import Db from './db';
import {argToArgsConfig} from 'graphql/type/definition';


const Person = new GraphQLObjectType({
	name: 'Person',
	description: 'This represents a Person',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(person) {
					return person.id
				},
			firstName: {
				type: GrqphQLString,
				resolve(person) {
					return person.firstName
				}
			 },
			 lastName: {
			 	type: GrqphQLString,
			 	resolve(person) {
			 		return person.lastName
			 	}
			 },

			 email:{
			 	type: new GrqphQLList(Post),
			 	resolve(person) {
			 		return person.getPosts()
			 	}
			 },
			 posts: {
			 	type: new GrqphQLList(Post),
			 	resolve(person) {
			 		return person.getPosts()
			 	}
			 }
			}
		}
	}
})

const Post = new GraphQLObjectType({
	name: 'Post',
	description: 'Blog post',
	fields() {
		return {
			title: {
				type: GraphQLString,
				resolve(post){
					return post.title
				}
			},
			content: {
				type: GraphQLString,
				resolve(post){
					return post.content
				}
			},
			title: {
				type: Person,
				resolve(post){
					return post.getPerson()
				}
			}
		}
	}
})

const Query = new GraphQLObjectType({
	name: 'Query',
	description: 'Root query object',
	fields: () => {
		return {
			people: {
				type: new GrqphQLList(Person),
				args: {
					id: {
						type: GrqphQLInt
					},
					email: {
						type: GraphQLString
					}
				},
				resolve(root, args) {
					return Db.models.person.findAll({where:args})
				}
			},
			posts: {
				type: new GraphQLList(Post),
				resolve(root, args) {
					return Db.models.post.findAll({where: args})
				}
			}
		};
	}
});


const Mutation = new GraphQLObjectType({
	name:'Mutations',
	description: 'Functions to set stuff',
	fields() {
		return {
			addPerson: {
				type: Person,
				args:{
					firstName: {
						type: new GraphQLNonNull(GraphQLString)
					},
					lastName: {
						type: new GraphQLNonNull(GraphQLString)
					},
					email: {
						type: new GraphQLNonNull(GraphQLString)
					}
				},
				resolve(source, args){
					return Db.models.person.create({
						firstName: args.firstName,
						lastName: args.lastName,
						email: args.email.toLowerCase()
					})
				}
			},
			addPost: {
				type: Post,
				args: {
					userId: {
						type: GraphQLNonNull(GraphQLInt)
					},
					title: {
						type: GraphQLNonNull(GraphQLString)
					},
					content: {
						type: GraphQLNonNull(GraphQLString)
					}
				},
				resolve(source, args) {
					return Db.models.person.findByPk(args.userId).then(user => {
						return person.createPost({
							title: args.title,
							content: args.content
						})
					})
				}
			}
		}
	}
})

const Schema = new GraphQLSchema({
	query: Query,
	mutation: Mutations
})

export default Schema;