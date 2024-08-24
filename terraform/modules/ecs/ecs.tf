# Define the module for ECS.
# This is used for creating the ECS cluster and the ECS service.

/*
  /*
  Purpose: Create an ECS cluster.
  Read more: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_cluster
*/
resource "aws_ecs_cluster" "ecs_cluster" {
  name = var.ecs_cluster_name
}

/*
  Purpose: Use the default VPC and subnets for the ECS cluster.
  Read more: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_vpc
*/
resource "aws_default_vpc" "default_vpc" {}

/*
  Purpose: Use the default subnets_a for the ECS cluster.
  Read more: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_subnet
*/
resource "aws_default_subnet" "default_subnet_a" {
  availability_zone = var.availability_zones[0]
}
resource "aws_default_subnet" "default_subnet_b" {
  availability_zone = var.availability_zones[1]
}
resource "aws_default_subnet" "default_subnet_c" {
  availability_zone = var.availability_zones[2]
}

/*
  Purpose: Create a task definition for the ECS service.
  Read more: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_task_definition
*/
resource "aws_ecs_task_definition" "ecs_task_definition" {
  family                = var.ecs_task_definition_family
  container_definitions = <<TASK_DEFINITION
  [
    {
      "name": "${var.ecs_task_definition_name}",
      "image": "${var.ecr_repo_url}",
      "essential": true,
      "portMappings": [
        {
          "containerPort": ${var.container_port},
          "hostPort": ${var.container_port}
        }
      ],
      "memory": ${var.memory},
      "cpu": ${var.cpu},
      "logConfiguration": {
				"logDriver": "awslogs",
        "options": {
					"awslogs-group": "${var.logs_group}",
					"awslogs-region": "${var.region}",
					"awslogs-stream-prefix": "[${var.ecs_cluster_name}] "
				}
			}
    }
  ]
  TASK_DEFINITION

  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = var.memory
  cpu                      = var.cpu
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
}

/*
  Purpose: Create a IAM role for the ECS task execution.
  Read more: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role
*/
resource "aws_iam_role" "ecs_task_execution_role" {
  name               = var.ecs_task_execution_role_name
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

/*
  Purpose: Attach the Amazon ECS task execution IAM policy to the IAM role.
  Read more: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment
*/
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}


/*
  Purpose: Create a Application Load Balancer for the ECS service.
  Read more: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb
*/
resource "aws_lb" "application_load_balancer" {
  name               = var.application_load_balancer_name
  load_balancer_type = "application"
  subnets = [
    "${aws_default_subnet.default_subnet_a.id}",
    "${aws_default_subnet.default_subnet_b.id}",
    "${aws_default_subnet.default_subnet_c.id}"
  ]
  security_groups = ["${aws_security_group.load_balancer_security_group.id}"]
}

/*
  Purpose: Create a security group for the Application Load Balancer.
  Read more: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group
*/
resource "aws_security_group" "load_balancer_security_group" {
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

/*
  Purpose: Create a target group for the Application Load Balancer.
  Read more: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group
*/
resource "aws_lb_target_group" "target_group" {
  name        = var.target_group_name
  port        = var.container_port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_default_vpc.default_vpc.id
  health_check {
    path = var.health_check_path
  }
}

/*
  Purpose: Create a listener for the Application Load Balancer.
  Read more: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener
*/
resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_lb.application_load_balancer.arn
  port              = "80"
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group.arn
  }
}

/*
  Purpose: Create a service for the ECS cluster.
  Read more: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_service
*/
resource "aws_ecs_service" "ecs_service" {
  name            = var.ecs_service_name
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.ecs_task_definition.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  load_balancer {
    target_group_arn = aws_lb_target_group.target_group.arn
    container_name   = aws_ecs_task_definition.ecs_task_definition.family
    container_port   = var.container_port
  }

  network_configuration {
    subnets          = ["${aws_default_subnet.default_subnet_a.id}", "${aws_default_subnet.default_subnet_b.id}", "${aws_default_subnet.default_subnet_c.id}"]
    assign_public_ip = true
    security_groups  = ["${aws_security_group.service_security_group.id}"]
  }
}

/*
  Purpose: Create a security group for the ECS service.
  Read more: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group
*/
resource "aws_security_group" "service_security_group" {
  ingress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    security_groups = ["${aws_security_group.load_balancer_security_group.id}"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
