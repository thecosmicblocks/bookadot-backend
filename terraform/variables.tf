# Purpose: Define the variables that will be used in the terraform code

variable "aws_region" {
  description = "The AWS region"
}

variable "resource_tags" {
  description = "Tags to set for all resources"
  type        = map(string)
}

variable "host_port" {
  description = "host port"
  type        = number
}
variable "memory" {
  description = "memory"
  type        = number
}
variable "cpu" {
  description = "cpu"
  type        = number
}

variable "domain" {
  description = "domain"
  type        = string
}

variable "bucket_name" {
  description = "The name of the S3 bucket. Must be globally unique."
  type        = string
}

variable "table_name" {
  description = "The name of the DynamoDB table. Must be globally unique."
  type        = string
}

variable "ecr_repo_name" {
  description = "The name of the ECR repository. Must be globally unique."
  type        = string
}

variable "ecs_cluster_name" {
  description = "The name of the ECS cluster."
  type        = string
}

variable "availability_zones" {
  description = "us-east-1 AZs"
  type        = list(string)
}

variable "ecs_task_definition_family" {
  description = "ECS Task Family"
  type        = string
}

variable "container_port" {
  description = "Container Port"
  type        = number
}

variable "ecs_task_definition_name" {
  description = "ECS Task Name"
  type        = string
}

variable "ecs_task_execution_role_name" {
  description = "ECS Task Execution Role Name"
  type        = string
}

variable "application_load_balancer_name" {
  description = "ALB Name"
  type        = string
}

variable "target_group_name" {
  description = "ALB Target Group Name"
  type        = string
}

variable "ecs_service_name" {
  description = "ECS Service Name"
  type        = string
}

variable "logs_group" {
  description = "CloudWatch Logs Group Name"
  type        = string
}