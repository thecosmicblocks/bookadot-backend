terraform {
  backend "s3" {
    bucket         = "bookadot-deployment" # The name of the S3 bucket. Must be globally unique.
    key            = "tf-infra/terraform.tfstate"
    region         = "ap-southeast-1" # The AWS region
    encrypt        = true
    # dynamodb_table = "bookadot-tf-state-lock" # The name of the DynamoDB table. Must be globally unique.
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

module "tf_state" {
  source = "./modules/tf-state"

  bucket_name = var.bucket_name
  table_name  = var.table_name
  environment = var.resource_tags.environment
}

module "ecr_repo" {
  source = "./modules/ecr"

  ecr_repo_name = var.ecr_repo_name
}

module "ecs" {
  source = "./modules/ecs"

  ecs_cluster_name               = var.ecs_cluster_name
  availability_zones             = var.availability_zones
  ecs_task_definition_family     = var.ecs_task_definition_family
  ecr_repo_url                   = module.ecr_repo.repository_url
  container_port                 = var.container_port
  ecs_task_definition_name       = var.ecs_task_definition_name
  ecs_task_execution_role_name   = var.ecs_task_execution_role_name
  application_load_balancer_name = var.application_load_balancer_name
  target_group_name              = var.target_group_name
  ecs_service_name               = var.ecs_service_name
  memory                         = var.memory
  cpu                            = var.cpu
}