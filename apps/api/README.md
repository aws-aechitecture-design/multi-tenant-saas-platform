🧰 Essential Commands — From Docker → Minikube → kubectl

## Build image
docker build -t api-service:1.0.0 .
## List images
docker images
## Start minikube
minikube start
## Check minikube status
minikube status
## Point Docker to minikube (VERY IMPORTANT)
eval $(minikube docker-env) (Run this once per terminal session)

☸️ 3️⃣ Kubernetes (kubectl Core Commands)
## Apply YAML
kubectl apply -f <file-or-folder>
## Get pods
kubectl get pods
## Get pods (watch)
kubectl get pods -w
## Describe a pod
kubectl describe pod <pod-name>
## View logs
kubectl logs <pod-name>
## Delete a pod
kubectl delete pod <pod-name>