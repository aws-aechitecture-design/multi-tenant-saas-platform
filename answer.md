real purpose of namespaces in Kubernetes?
---------------------------------------------
seperatation resource and make it each tenant has own resource isolated 
from the another tenant

If a Pod in tenant-a tries to access a Service in tenant-b:
Is it allowed by default?
----> i think no
What must exist to allow or deny it?
----> rbac

You create two namespaces:

tenant-a

tenant-b

Both deploy:

A Service named api

A Deployment named api

❓ Why is this allowed?
❓ What problem does this solve?

i dont know 
----------------------
❓ Question 2

Which of these are namespace-scoped?

Pod

Deployment

Service

ConfigMap

Secret

i dont understanding qustion  , what you mean when you say scoped

------------------------
❓ Question 1

Which of these exist once per cluster, not per namespace?

kube-apiserver

kube-scheduler

etcd

Ingress Controller

StorageClass

i dont know 