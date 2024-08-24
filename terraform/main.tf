terraform {
  backend "s3" {
    bucket  = "bookadot-backend-bucket" # The name of the S3 bucket. Must be globally unique.
    key     = "tf-infra/terraform.tfstate"
    region  = "ap-southeast-1" # The AWS region
    encrypt = true
    # dynamodb_table = "bookadot-backend-tf-state-lock" # The name of the DynamoDB table. Must be globally unique.
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

  bucket_name = "${var.project_prefix}-bucket"
  table_name  = "${var.project_prefix}-tf-state-lock"
  environment = var.environment
}

module "ecr_repo" {
  source = "./modules/ecr"

  ecr_repo_name = var.project_prefix
}

module "cloudwatch" {
  source = "./modules/cloudwatch"

  logs_group = "${var.project_prefix}-logs"
}

module "ecs" {
  source = "./modules/ecs"

  ecs_cluster_name               = "${var.project_prefix}-cluster"
  availability_zones             = var.availability_zones
  ecs_task_definition_family     = "${var.project_prefix}-service"
  ecr_repo_url                   = module.ecr_repo.repository_url
  container_port                 = var.container_port
  ecs_task_definition_name       = "${var.project_prefix}-service"
  ecs_task_execution_role_name   = "${var.project_prefix}-ecs-execution-role"
  application_load_balancer_name = "${var.project_prefix}-alb"
  target_group_name              = "${var.project_prefix}-tg"
  ecs_service_name               = "${var.project_prefix}-service"
  memory                         = var.memory
  cpu                            = var.cpu
  region                         = var.aws_region
  logs_group                     = "${var.project_prefix}-logs"
  health_check_path              = var.health_check_path
}