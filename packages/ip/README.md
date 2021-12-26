# `ip`

Keeping track of the public ip where the service runs. This is used to
sync with remote DNS services.

Note: This would have totally worked if Namecheap did not require
whitelisting IP. It doesn't make sense when the point of syncing IP is
because the current public IP has changed which means it won't match
the whitelisted IP. Shame.
