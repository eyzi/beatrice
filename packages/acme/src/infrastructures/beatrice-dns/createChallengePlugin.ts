const nodeFetch = require("node-fetch");
import {
	ChallengePluginParameter
} from "../../types"

const initInit = (
	_baseUrl: string
) => async () => null

const initZones = (
	_baseUrl: string
) => async (
	{ dnsHosts }: ChallengePluginParameter
) => dnsHosts

const initGet = (
	baseUrl: string
) => async (
	{ challenge }: ChallengePluginParameter
) => {
	const name = challenge && challenge.identifier.value ? challenge.identifier.value : "";
	const type = "TXT";
	const data = challenge && challenge.dnsAuthorization ? challenge.dnsAuthorization : "";
	const url = `http://${baseUrl}?name=${name}&type=${type}&data=${data}`;
	const response = await nodeFetch(url);
	const record = await response.json();
	return record ? { dnsAuthorization: record.data } : null;
}

const initSet = (
	baseUrl: string
) => async (
	{ challenge }: ChallengePluginParameter
) => {
	const host = challenge ? challenge.dnsHost || `${challenge.dnsPrefix}.${challenge.dnsZone}` : "";
	const dnsAuthorization = challenge && challenge.dnsAuthorization ? challenge.dnsAuthorization : "";
	const options = {
		method: 'post',
		body: JSON.stringify({
			name: host,
			type: 'TXT',
			data: dnsAuthorization,
			ttl: '300'
		}),
		headers: { 'Content-Type': 'application/json' }
	};
	await nodeFetch(`http://${baseUrl}`, options);
	return null;
}

const initRemove = (
	baseUrl: string
) => async (
	{ challenge }: ChallengePluginParameter
) => {
	const name = challenge ? challenge.dnsHost || `${challenge.dnsPrefix}.${challenge.dnsZone}` : "";
	const type = "TXT";
	const data = challenge && challenge.dnsAuthorization ? challenge.dnsAuthorization : "";
	const url = `http://${baseUrl}?name=${name}&type=${type}&data=${data}`;
	const response = await nodeFetch(url).then((res: any) => res.json());
	const record = response && response.length > 0 ? response[0] : null
	if (record) await nodeFetch(`http://${baseUrl}/${record.id}`, { method: 'delete' });
	return null;
}

const initCreate = (
	baseUrl: string,
	propagationDelay: number
) => () => ({
	propagationDelay,
	init: initInit(baseUrl),
	zones: initZones(baseUrl),
	get: initGet(baseUrl),
	set: initSet(baseUrl),
	remove: initRemove(baseUrl)
})

export default (
	baseUrl: string,
	propagationDelay: number
) => ({
	create: initCreate(baseUrl, propagationDelay),
	...initCreate(baseUrl, propagationDelay)() // creates set and remove
})