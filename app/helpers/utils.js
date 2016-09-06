import { usersDucksExpirationLength, usersExpirationLength } from 'config/constants';

export function formatUserInfo(name, avatar, uid) {
	return {
		name,
		avatar,
		uid
	}
}

export function formatDuck(text, {name, avatar, uid}) {
	return {
		text,
		name,
		avatar,
		uid,
		timestamp: Date.now()
	}
}

export function formatTimestamp(timestamp) {
	const date = new Date(timestamp);
	return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export function formatReply({name, uid, avatar}, reply) {
	return {
		name,
		reply,
		uid,
		avatar,
		timestamp: Date.now()
	}
}

function getMilliseconds(timestamp) {
	return new Date().getTime() - new Date(timestamp).getTime()
}

export function staleDucks(timestamp) {
	return getMilliseconds(timestamp) > usersDucksExpirationLength
}

export function staleUser(timestamp) {
	return getMilliseconds(timestamp) > usersExpirationLength
}