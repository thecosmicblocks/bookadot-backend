# Purpose: Define the variables that will be used in the terraform code

variable "aws_region" {
  description = "The AWS region"
}

variable "project_prefix" {
  description = "The prefix to use for all resources"
  type        = string
}

variable "environment" {
  description = "The environment to deploy to"
  type        = string
}

variable "host_port" {
  description = "host port"
  type        = number
}

variable "container_port" {
  description = "Container Port"
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

variable "availability_zones" {
  description = "us-east-1 AZs"
  type        = list(string)
}

variable "domain" {
  description = "domain"
  type        = string
}

variable "health_check_path" {
  description = "Health Check Path"
  type        = string
}