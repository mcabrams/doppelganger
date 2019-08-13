# Soundproud
> TODO

## Development Setup

### Docker Compose

```sh
docker-compose build
docker-compose up -d
```

Open localhost:8080 in your browser.

### Kubernetes

Set up kubernetes, minikube, etc.  Start minikube.

Setup secret for access to private docker images.  Replace with path to
docker config.json.  Make sure to appropriately setup authorization according
to registry being used (i.e. gcr via gcloud).

Gcloud:
```sh
# create a GCP service account; format of account is email address
SA_EMAIL=$(gcloud iam service-accounts --format='value(email)' create k8s-gcr-auth-ro)
# create the json key file and associate it with the service account
gcloud iam service-accounts keys create k8s-gcr-auth-ro.json --iam-account=$SA_EMAIL
# get the project id
PROJECT=$(gcloud config list core/project --format='value(core.project)')
# add the IAM policy binding for the defined project and service account
gcloud projects add-iam-policy-binding $PROJECT --member serviceAccount:$SA_EMAIL --role roles/storage.objectViewer
```

if `.docker` is in home directory:
```sh
SECRETNAME=regcred

kubectl create secret docker-registry $SECRETNAME \
  --namespace soundproud \
  --docker-server=https://gcr.io \
  --docker-username=_json_key \
  --docker-email=mcabrams1@gmail.com.com \
  --docker-password="$(cat k8s-gcr-auth-ro.json)"
```

Add the secret to the Kubernetes configuration.
You can add it to the default service account with the following command:

```sh
SECRETNAME=regcred

kubectl patch serviceaccount default \
  -n soundproud \
  -p "{\"imagePullSecrets\": [{\"name\": \"$SECRETNAME\"}]}"
```

Then deploy manifests either with kubectl or skaffold


### Option 1: skaffold

```sh
# This first line is necessary to apply the name space
kubectl apply -f .
skaffold dev --port-forward
```

### Options 2: kubectl

```sh
kubectl apply -f .
kubectl apply -f ./server/
kubectl apply -f ./database/
kubectl apply -f ./prisma/
```

Note: You can skip below if you opted for skaffold!

------ SKIPPABLE W/ SKAFFOLD -------

Find the pod to exec prisma deploy and generate

```sh
kubectl get pods -n soundproud
```

Which will return something like

```sh
NAME                        READY   STATUS    RESTARTS   AGE
database-657f469468-frg5j   1/1     Running   0          3h49m
prisma-6d4fbf99b4-6t29g     1/1     Running   0          3h49m
server-5b9454995c-pr8pf     1/1     Running   0          5m42s
```

Port forward the prisma instance

`kubectl port-forward -n soundproud <the-pod-name> 4467:4466` – This will
forward from `127.0.0.1:4467` -> `kubernetes-cluster:4466`

------ END SKIPPABLE W/ SKAFFOLD -------

The Prisma server is now reachable via `http://localhost:4467`. This is the
actual `endpoint` we have specified in `.local.env`. We can now deploy
`prisma` and deploy to stage `production`, at:
`http://localhost:4467/soundproud/production`.

If you haven't already, install prisma on host:
```sh
npm install -g prisma
```

With this in place, we can deploy the Prisma service via the Prisma CLI
(`cd server; prisma deploy -e .local.env`) as long as the port
forwarding to the cluster is active.`

<!-- Then exec sh on server pod and deploy prisma -->

<!-- ```sh -->
<!-- kubectl exec -it -n prisma server-5b9454995c-pr8pf /bin/sh -->
<!-- ./node_modules/.bin/prisma deploy -->
<!-- ./node_modules/.bin/prisma generate -->
<!-- ``` -->


Open server in browser
```sh
minikube service -n soundproud server
```

Open client in browser
```sh
minikube service -n soundproud client
```


You'll need to add /graphql to get to the graphql playground

## Installing new packages or using CLI to adjust what gets included in prisma image

### Server
```sh
cd server/
docker-compose build
docker-compose up -d
```

To perform actions inside container:
```
docker-compose run server /bin/sh
```

Open http://localhost:4666/graphql


### Client
```sh
cd client/
docker-compose build
docker-compose up -d
```

To perform actions inside container:
```
docker-compose run client /bin/sh
```

\# TODO

## Development Host Side

If you want things like linting and typechecking to work on the host side,
feel free to run `npm install` from host (in `server/` or `client/`) directory
on the host.  It will generate node_modules, presumably identical to inside the
server container, and won't overwrite those through skaffold nor docker
compose.

Additionally, when developing for the client, you'll want to run
`npm run generate` or `npm run generate:watch` on the host from the `client`
directory to ensure that you can see the generated graphql-codegen files (which
are excluded from syncing to host via use of a named volume).


## Running Tests
```sh
#TODO
```
## Deployment
```sh
#TODO
```
